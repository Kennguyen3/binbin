import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { ProductModal } from './components/ProductModal';
import { ShopInfo } from './components/ShopInfo';
import { PopularProductItem } from './components/PopularProductItem';
import { CartFooter } from './components/CartFooter';
import { styles } from './styles';
import { ShopHeader } from './components/ShopHeader';
import { SkeletonHeader } from '@/components/SkeletonHeader';
import { showMessage } from 'react-native-flash-message';
import { useAuth } from '@/context/AuthContext';
import { ADD_REMOVE_FAVORITE, SHOP_DETAILS } from '@/constants/API';
import { Product } from '@/models/Product';
import { truncateText } from '@/services/TextService';
import { OrderCreate } from '@/models/OrderCreate';

const ShopDetailScreen = ({ route, navigation }) => {
  const { shopId } = route.params;
  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [chooseProduct, setChooseProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(null);
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
  const [error, setError] = useState(null);

  // 🔥 LOAD DATA
  useEffect(() => {
    if (!user) {
      showMessage({
        message: "Vui lòng đăng nhập",
        type: "warning",
      });
      navigation.navigate("Login");
      return;
    }

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
          signal: abortController.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Lỗi ${response.status}: Không thể tải thông tin cửa hàng`);
        }

        if (data?.result) {
          showMessage({
            message: "Tải thông tin cửa hàng thành công",
            type: "success",
            duration: 2000,
          });
          setStore(data.result);
        } else {
          throw new Error('Không tìm thấy thông tin cửa hàng');
        }

      } catch (error) {
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

    return () => {
      abortController.abort();
    };

  }, [shopId, user, navigation]);
  // Chuẩn bị data cho FlatList sections
  const sections = [
    { type: 'header', data: store },
    { type: 'shop_info', data: store },
    ...(store?.popular_products?.length > 0
      ? [{ type: 'popular_products', data: store.popular_products }]
      : []
    ),
    ...(store?.categories?.map(category => ({
      type: 'category',
      data: category,
    })) || []),
  ];

  const renderItem = useCallback(({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <ShopHeader
            imageUri={item.data?.avatar}
            onGoBack={handleGoBack}
            onShare={handleShare}
          />
        );

      case 'shop_info':
        return (
          <ShopInfo
            name={item.data?.name}
            address={item.data?.address}
            distance={item.data?.distance}
            rating={item.data?.averageStarRating}
            isFavorite={store?.favorite}
            onToggleFavorite={handleWishlist}
          />
        );

      case 'popular_products':
        return (
          <View style={{ paddingHorizontal: 16 }}>
            <View style={styles.titleGroup}>
              <Text style={styles.titleLeft}>Món Phổ Biến</Text>
            </View>
            <FlatList
              data={item.data}
              renderItem={({ item: product }) => (
                <PopularProductItem
                  item={product}
                  onAddToCart={addProductToCart}
                />
              )}
              keyExtractor={product => product.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listStores}
            />
          </View>
        );

      case 'category':
        return renderCategoryItem({ item: item.data });

      default:
        return null;
    }
  }, [store]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={[styles.itemContainerStoresLineCategory, { marginHorizontal: 10 }]}>
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


  const renderCategoryItem = ({ item: category }) => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.categoryTitle}>{category.name}</Text>

        {/* Empty state */}
        {!category.products || category.products.length === 0 ? (
          <View style={styles.emptyProductContainer}>
            <Text style={styles.emptyProductText}>Chưa có sản phẩm nào</Text>
          </View>
        ) : (
          /* Render category products */
          category.products.map(product => renderProductItem({ item: product }))
        )}
      </View>
    );
  };

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleShare = useCallback(() => {
    // Share logic
    navigation.goBack();
  }, []);

  const handleWishlist = useCallback(() => {
    if (!store) {
      showMessage({
        message: "Không thể thay đổi yêu thích",
        description: "Thông tin cửa hàng không hợp lệ",
        type: "danger",
      });
      return;
    };
    const wishlist = !store?.favorite;
    console.log('Wishlist status:', wishlist);
    setStore({
      ...store,
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
  }, []);

  const addProductToCart = useCallback((product) => {
    setChooseProduct(product);
    setOpenModal(true);
  }, []);

  const closeProductToCart = useCallback(() => {
    setOpenModal(false);
    setQuantity(1);
    setNote('');
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }, []);

  const addProductCart = useCallback(() => {
    // Add to cart logic
    setOpenModal(false);
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
  }, [quantity, note, chooseProduct]);

  const handleConfirmOrder = useCallback(() => {
    if (cart.products.length == 0) {
      Alert.alert('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }
    navigation.navigate('ConfirmOrder', { data: cart });
  }, [cart]);

  if (loading) {
    return <SkeletonHeader />;
  }

  return (
    <View style={styles.container}>
      <ProductModal
        visible={openModal}
        product={chooseProduct}
        quantity={quantity}
        note={note}
        onClose={closeProductToCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onNoteChange={setNote}
        onAddToCart={addProductCart}
      />

      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={10}
      />

      <CartFooter
        quantity={cart.qty}
        totalPrice={cart.total_price_product}
        onCheckout={handleConfirmOrder}
      />
    </View>
  );
};

export default ShopDetailScreen;