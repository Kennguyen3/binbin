// src/views/ProductList/ProductListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { getStores } from '../../services/StoreDetail';
import { useAuth } from '../../context/AuthContext';
import { Store } from '../../models/Store';
import { styles } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Fontisto';
import { truncateText } from '../../services/TextService';
import { Categorie } from '../../models/Categorie';
import { Product } from '../../models/Product';
import { formatToVND } from '../../utils/currencyUtils';  // Import hàm từ file utils
import { OrderCreate } from '../../models/OrderCreate';
import { STORE_DETAIL, ADD_REMOVE_FAVORITE, SHOP_DETAILS } from '../../constants/API';
import { presentToastMessage } from '@/utils/functions';
import { showMessage } from 'react-native-flash-message';
import { SkeletonHeader } from '@/components/SkeletonHeader';

type ShopDetailScreenNavigationProp = NavigationProp<RootStackParamList, 'ShopDetail'>;
interface ShopDetailProps {
  route: {
    params: {
      shopId: number;
      shopName: string;
    };
  };
}
const ShopDetailScreen: React.FC<ShopDetailProps> = ({ route }) => {
  const { shopId, shopName } = route.params;
  const navigation = useNavigation<ShopDetailScreenNavigationProp>();
  const { user } = useAuth();

  const [chooseProduct, setChooseProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cart, setCart] = useState<OrderCreate>({
    "id_store": shopId,
    "address_shipping": user?.address_default?.address,
    "name_user": user?.full_name ? user?.full_name : '',
    "phone_user": user?.phone_number ? user?.phone_number : '',
    "total_price_product": 0,
    "price_shipping": 0,
    "price_sale": 0,
    "total_order": 0,
    "note_shipping": '',
    "price_bonus_shipping": 0,
    "payment_method": "cash",
    "qty": 0,
    "products": []
  });

  const handleConfirmOrder = () => {
    if (cart.products.length == 0) {
      Alert.alert('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }
    navigation.navigate('ConfirmOrder', { data: cart });
  };

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addProductToCart = (item: Product) => {
    setChooseProduct(item);
    setOpenModal(true);
  };
  const addProductCart = () => {
    let productsData = cart.products;
    productsData.push({
      "product_id": chooseProduct?.id ? chooseProduct?.id : 0,
      "qty": quantity,
      "note_store": note,
      "price": chooseProduct?.price ? chooseProduct?.price : 1,
      "img": chooseProduct?.image_files,
      "title": chooseProduct?.name,
      "description": chooseProduct?.description
    });
    setCart({
      ...cart,
      qty: cart.qty + quantity,
      total_price_product: cart.total_price_product + (quantity * (chooseProduct?.price ? chooseProduct?.price : 1)),
      products: productsData
    });
    closeProductToCart();
  };


  const closeProductToCart = () => {
    setNote('');
    setQuantity(1);
    setChooseProduct(null);
    setOpenModal(false);
  };
  const handleWishlist = () => {
    if (!stores) return;
    const wishlist = !stores?.favorite;
    setStores({
      ...stores,
      favorite: wishlist
    });
    fetch(ADD_REMOVE_FAVORITE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        shop_id: shopId
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => { });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const [stores, setStores] = useState<Store>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Early return nếu không có user
    if (!user) {
      showMessage({
        message: "Vui lòng đăng nhập",
        type: "warning",
      });
      navigation.navigate("Login");
      return;
    }

    // AbortController để cancel request khi unmount
    const abortController = new AbortController();

    const fetchShopDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(SHOP_DETAILS(shopId), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.access_token}`,
          },
          signal: abortController.signal, // Cancel request on unmount
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Lỗi ${response.status}: Không thể tải thông tin cửa hàng`);
        }

        if (data?.result) {
          setStores(data.result);
        } else {
          throw new Error('Không tìm thấy thông tin cửa hàng');
        }

      } catch (error: any) {
        // Ignore abort errors
        if (error.name === 'AbortError') {
          console.log('Request cancelled');
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Đã có lỗi xảy ra';

        setError(errorMessage);
        console.error('Error fetching shop details:', errorMessage);

        showMessage({
          message: "Không thể tải thông tin",
          description: errorMessage,
          type: "danger",
          duration: 4000,
        });

      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();

    // Cleanup: cancel request khi component unmount
    return () => {
      abortController.abort();
    };

  }, [shopId, user, navigation]);


  // useEffect(() => {
  //   if (!user) {
  //     navigation.navigate("Login");
  //   }
  //   console.log('===> fetchProducts:', SHOP_DETAILS(shopId), user);
  //   const fetchProducts = async () => {
  //     fetch(SHOP_DETAILS(shopId), {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user?.access_token}`,
  //         'Accept': 'application/json',
  //       }
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         setStores(data.result);
  //       })
  //       .catch(error => { 
  //         console.error('Error fetching store details:', error);
  //       });

  //   };
  //   fetchProducts();
  // }, []);
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainerStoresLineCategory}>
      <Image source={{ uri: item.image_files }} style={styles.imageStoresLine} resizeMode="cover" />
      <View style={styles.groupInfoStoreLine} >
        <View style={styles.groupDesTitle}>
          <Text style={styles.titleStores}>{item.name}</Text>
          <Text style={styles.descriptionStore}>{truncateText(item.description, 30)}</Text>
          <Text style={styles.soildedStore}>{item.quantity_sold} đã bán</Text>
          <View style={styles.groupAddtoCartPrice}>
            <Text style={styles.priceProductList}>{item.price_format}</Text>
            <TouchableOpacity onPress={() => addProductToCart(item)}>
              <Image source={require('../../media/icon/plus.png')} style={styles.plusCart} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Hàm render cho danh sách category
  const renderCategoryItem = ({ item }: { item: Categorie }) => (
    item?.products && item?.products.length > 0 && (
      <View style={styles.categoryContainer}>
        <View style={styles.titleGroupCategory}>
          <Text style={styles.titleLeft}>{item.name}</Text>
        </View>
        <FlatList
          data={item.products}
          renderItem={renderProductItem}
          keyExtractor={(product) => product.id.toString()}
        />
      </View>
    )
  );
  return (
    <View style={styles.container}>
      {openModal ?
        <View style={styles.containerModal}>
          <View style={styles.bannerProduct}>
            <Image
              source={{ uri: chooseProduct?.image_files }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.groupCloseImg} onPress={closeProductToCart} >
              <Image
                source={require('../../media/icon/close_modal.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>

          </View>
          <View style={styles.productInfo}>
            <Text style={styles.title}>{chooseProduct?.name}</Text>
            <Text style={styles.description}>{chooseProduct?.description}</Text>
            <Text style={styles.sold}>{chooseProduct?.quantity_sold} đã bán</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatToVND(chooseProduct?.price ? chooseProduct?.price : 0)}</Text>

              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.btnPlus}>
                  <Icon name="minus-a" size={14} color="#000" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.btnPlus}>
                  <Icon name="plus-a" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Ghi chú cho quán</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập ghi chú"
              value={note}
              onChangeText={setNote}
              multiline={true} // Cho phép nhiều dòng
              numberOfLines={4}
            />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng ({quantity})</Text>
              <Text style={styles.totalPrice}>{(quantity * (chooseProduct?.price ? chooseProduct?.price : 1)).toLocaleString()}đ</Text>
            </View>

            <TouchableOpacity onPress={addProductCart} style={styles.addToCartButton}>
              <Text style={styles.buttonText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
        : null}

      {loading ? (
        <SkeletonHeader />
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.sliders}>
            <View style={styles.customSlide}>
              <Image source={{ uri: stores?.avatar }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
            </View>
            <TouchableOpacity style={styles.backHeader} onPress={() => handleGoBack()}>
              <Image source={require('../../media/icon/back.png')} style={styles.backHeaderIMG} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareHeader} onPress={() => handleGoBack()}>
              <Image source={require('../../media/icon/share.png')} style={styles.shareHeaderIMG} />
            </TouchableOpacity>
          </View>
          <View style={styles.content_cuahang}>
            <View style={styles.group_titleStore}>
              <Image source={require('../../media/icon/check_title.png')} style={styles.ico_titleStore} />
              <Text style={styles.tt_store}>{stores?.name}</Text>
            </View>
            <Text style={styles.add_store}>{stores?.address}</Text>

            <View style={styles.rating_fatory}>
              <View style={styles.starLocaitonGroup}>
                <View style={styles.locationGroup}>
                  <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
                  <Text style={styles.locationTitle}>{stores?.distance}</Text>
                </View>
                <View style={styles.starGroup}>
                  <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
                  <Text style={styles.starTitle}>{stores?.averageStarRating} (100+)</Text>
                </View>
              </View>
              {
                stores?.favorite ?
                  <TouchableOpacity style={styles.fatoryGroup} onPress={() => handleWishlist()}>
                    <Text style={styles.fatoryTitle}>Yêu thích</Text>
                    <Image source={require('../../media/icon/wishlist.png')} style={styles.factoryStore} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.fatoryGroup} onPress={() => handleWishlist()}>
                    <Text style={styles.fatoryTitle}>Yêu thích</Text>
                    <Image source={require('../../media/icon/fatory_uncheck.png')} style={styles.factoryStore} />
                  </TouchableOpacity>
              }
            </View>
            {stores?.popular_products && stores?.popular_products.length > 0 && (
              <View style={styles.titleGroup}>
                <Text style={styles.titleLeft}>Món Phổ Biến</Text>
              </View>
            )}
            {stores?.popular_products && stores?.popular_products.length > 0 && (
              <View style={[styles.listStores, styles.mgT10]}>
                <FlatList
                  data={stores?.popular_products}
                  renderItem={({ item }) => (

                    <View style={styles.itemContainerStoresLine}>
                      <Image source={{ uri: item.image_files }} style={styles.imageStoresLine} resizeMode="cover" />
                      <View style={styles.groupInfoStoreLine} >
                        <View style={styles.groupDesTitle}>
                          <Text style={styles.titleStores}>{truncateText(item.name, 20)}</Text>
                          <Text style={styles.descriptionStore}>{truncateText(item.description, 70)}</Text>
                          <Text style={styles.soildedStore}>{item.quantity_sold} đã bán</Text>
                          <View style={styles.groupAddtoCartPrice}>
                            <Text style={styles.priceProductList}>{item.price_format}</Text>
                            <TouchableOpacity onPress={() => addProductToCart(item)}>
                              <Image source={require('../../media/icon/plus.png')} style={styles.plusCart} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                />
              </View>
            )}
            <FlatList
              data={stores?.categories}
              renderItem={renderCategoryItem}
              keyExtractor={(category) => category.id.toString()}
            />
          </View>
        </ScrollView>
      )
      }

      <View>
        <View style={styles.containerFooter}>
          <View style={styles.cartPriceFooter}>
            <Image source={require('../../media/icon/cart.png')} style={styles.cartFooter} />
            <Text style={styles.priceFooter}>{cart.qty} Món - {formatToVND(cart.total_price_product)}</Text>
          </View>
          <TouchableOpacity style={styles.checkOutFooter} onPress={handleConfirmOrder}>
            <Text style={styles.textCheckout}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShopDetailScreen;
