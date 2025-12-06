
import React, { useState, useEffect, use, useCallback } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesShipping';
import { useAuth } from '../../context/AuthContext';
import { LIST_ORDER, LIST_ORDER_PROCESS } from '../../constants/API';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import LoadingOverlay from '../../components/LoadingOverlay';
import { OrderList } from '../../models/OrderCreate';
import LoginScreen from '../Login/LoginScreen';

type ShippingScreenNavigationProp = NavigationProp<RootStackParamList, 'Shipping'>;

const ShippingScreen = () => {
  const { login, user, logout } = useAuth();
  const [activeButton, setActiveButton] = useState('orders');
  const [orders, setOrders] = useState<OrderList[]>();
  const [ordersProcess, setOrdersProcess] = useState<OrderList[]>();
  const navigation = useNavigation<ShippingScreenNavigationProp>();

  const [loadding, setLoadding] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(1);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    setLoadding(true);
    fetch(LIST_ORDER_PROCESS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(user?.access_token);

        setOrdersProcess(data.result.data);
        setLoadding(false);
      })
      .catch(error => {
        setLoadding(false);
      });


    fetch(LIST_ORDER, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setOrders(data.result.data);
        setLoadding(false);
      })
      .catch(error => {
        setLoadding(false);
      });

  }, []);
  const handleOrder = (orderId: number) => {
    navigation.navigate('OrderDetail', { orderId: String(orderId) })
  };
  const handleOrderPress = (orderId: number) => {
    navigation.navigate('WaittingOrder', { id: String(orderId) });
  };
  const formatCreatedAt = (createdAt: any) => {
    // Tạo đối tượng Date từ chuỗi created_at
    const date = new Date(createdAt);

    // Lấy các thành phần cần thiết
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng tính từ 0 nên cần +1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format để đảm bảo 2 chữ số cho ngày, tháng, giờ và phút
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Trả về chuỗi theo định dạng "dd/mm/yyyy hh:mm"
    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  };
  const handleShopPress = (shopId: string, shopName: string) => {
    navigation.navigate('ShopDetail', { shopId: shopId, shopName });
  };
  const getTotalItems = (order_personal_items) => {
    return order_personal_items.reduce((total, item) => total + item.qty, 0);
  };


  const [visibleLoginScreen, setVisibleLoginScreen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [user])
  );

  const checkLoginStatus = async () => {
    console.log('Checking login status...: ', user);
    if (!user) {
      setVisibleLoginScreen(true);
    } else {
      setVisibleLoginScreen(false);
    }
  };
  return (

    <View style={styles.container}>
      {
        visibleLoginScreen &&
        <LoginScreen
          isVisible={visibleLoginScreen}
          onClose={() => {
            setVisibleLoginScreen(false)
            navigation.navigate('MainTabs', { screen: 'Home' });
          }}
        />
      }
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <HeaderTab showBack={false} title="Đơn hàng" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.menuTabs}>
          <TouchableOpacity
            style={[
              styles.itemTabs,
              activeItem === 1 && styles.activeItem,
            ]}
            onPress={() => setActiveItem(1)}
          >
            <Text style={[styles.itemText, activeItem === 1 && styles.activeItemText]}>Đơn đang đến</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.itemTabs,
              activeItem === 2 && styles.activeItem,
            ]}
            onPress={() => setActiveItem(2)}
          >
            <Text style={[styles.itemText, activeItem === 2 && styles.activeItemText]}>Lịch sử đơn hàng</Text>
          </TouchableOpacity>
        </View>
        {activeItem == 2 ?

          <View style={styles.listMenuActive}>

            {orders && orders.length > 0 && (
              <>
                <FlatList
                  data={orders}
                  renderItem={({ item }) => (
                    <View style={styles.itemMenuActive}>
                      <View style={styles.paddingHorizontalItemActive}>
                        <View style={styles.headerItemActive}>
                          <View style={styles.infoCardActive}>
                            <Text style={styles.idCardActive}>Mã đơn hàng: #{item.id}</Text>
                            <Text style={styles.timeCardActive}>{formatCreatedAt(item.created_at)}</Text>
                          </View>
                          <View style={styles.statusCardActive}>

                            {
                              item.status != 'canceled' ?
                                <>
                                  <Image source={require('../../media/icon/check_card.png')} style={styles.icoReadmoreStoreOld} />
                                  <Text style={styles.titleStatusCardActive}>Hoàn thành</Text>
                                </>

                                :
                                <Text style={styles.titleStatusCardActiveCancel}>Đã hủy</Text>
                            }

                          </View>
                        </View>
                        <View style={styles.bodyItemActive}>
                          <View style={styles.storeNameActive}>
                            <Text style={styles.titleStoreCardActive}>{item.detail.shop_name}</Text>
                            <TouchableOpacity style={styles.groupTitleReadmoreStoreActive} onPress={() => handleShopPress(item.shop_id, item.detail.shop_name)}>
                              <Text style={styles.titleReadmoreStoreActive}>Xem quán</Text>
                              <Image source={require('../../media/icon/readmore.png')} style={styles.icoReadmoreStoreActive} />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.infoProductCardActive}>
                            <View style={styles.listsProductCardActive}>
                              {item.order_personal_items && item.order_personal_items.map((order, index) => (
                                <Text style={styles.itemProductCardActive}>{order.qty} x {order.item_name}</Text>
                              ))}
                            </View>
                            <View style={styles.infoPriceViewCardActive}>
                              <Text style={styles.priceCardActive}>{item.customer_pay_format}</Text>
                              <TouchableOpacity style={styles.groupTotalProductCardActive} onPress={() => handleOrder(item.id)} >
                                <Text style={styles.totalProductCardActive}>{getTotalItems(item.order_personal_items)} món</Text>
                                <Image source={require('../../media/icon/readmore.png')} style={styles.iconReadmoreDetailCardActive} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={styles.footerItemOld}>
                        <TouchableOpacity style={styles.btnRatingCardOld} onPress={() => handleOrder(item.id)} >
                          <Text style={styles.btnTextRatingCardOld} >Xem Chi Tiết</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                />
              </>
            )}
          </View>
          :

          <View style={styles.listMenuActive}>
            {ordersProcess && ordersProcess.length > 0 && (
              <>
                <FlatList
                  data={ordersProcess}
                  renderItem={({ item }) => (
                    <View style={styles.itemMenuActive}>
                      <View style={styles.paddingHorizontalItemActive}>
                        <View style={styles.headerItemActive}>
                          <View style={styles.infoCardActive}>
                            <Text style={styles.idCardActive}>Mã đơn hàng: #{item?.id}</Text>
                            <Text style={styles.timeCardActive}>{formatCreatedAt(item.created_at)}</Text>
                          </View>
                          <View style={styles.statusCardActive}>
                            <View style={styles.colorStatusCardActive}></View>
                            <Text style={styles.titleStatusCardActive}>Đã đặt</Text>
                          </View>
                        </View>
                        <View style={styles.bodyItemActive}>
                          <View style={styles.storeNameActive}>
                            <Text style={styles.titleStoreCardActive}>{item.detail.shop_name}</Text>
                            <TouchableOpacity style={styles.groupTitleReadmoreStoreActive} onPress={() => handleShopPress(item.shop_id, item.detail.shop_name)}>
                              <Text style={styles.titleReadmoreStoreActive}>Xem quán</Text>
                              <Image source={require('../../media/icon/readmore.png')} style={styles.icoReadmoreStoreActive} />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.infoProductCardActive}>
                            <View style={styles.listsProductCardActive}>
                              {item.order_personal_items && item.order_personal_items.map((order, index) => (
                                <Text style={styles.itemProductCardActive}>{order.qty} x {order.item_name}</Text>
                              ))}
                            </View>
                            <View style={styles.infoPriceViewCardActive}>
                              <Text style={styles.priceCardActive}>{item.customer_pay_format}</Text>
                              <TouchableOpacity style={styles.groupTotalProductCardActive} onPress={() => handleOrderPress(item.id)} >
                                <Text style={styles.totalProductCardActive}>{getTotalItems(item.order_personal_items)} món</Text>
                                <Image source={require('../../media/icon/readmore.png')} style={styles.iconReadmoreDetailCardActive} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={styles.footerItemActive}>
                        <TouchableOpacity onPress={() => handleOrderPress(item.id)} >
                          <Text style={styles.statusGrabOrderActive}> {item.driver_id ? "Tài xế đang lấy đơn" : "Đợi tài xế nhận đơn."}</Text>
                          <Text style={styles.timeStatusGrabOrderActive}>Dự kiến : {item.duration} sẽ giao đến bạn</Text>
                        </TouchableOpacity>

                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                />
              </>

            )}
          </View>
        }
      </ScrollView>
      <FooterMenu active={activeButton} />
    </View>
  );
};




export default ShippingScreen;
