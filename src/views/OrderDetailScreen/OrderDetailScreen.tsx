import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getStores } from '../../services/StoreDetail';
import { useAuth } from '../../context/AuthContext';
import { Store } from '../../models/Store';
// import { styles } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeaderTab from '../../components/HeaderTab';
import { OrderList } from '../../models/OrderCreate';
import LoadingOverlay from '../../components/LoadingOverlay';
import { DETAIL_ORDER } from '../../constants/API';

type OrderDetailScreenNavigationProp = NavigationProp<RootStackParamList, 'OrderDetail'>;
interface ShopDetailProps {
  route: {
    params: {
      orderId: number;
    };
  };
}
const OrderDetailScreen: React.FC<ShopDetailProps> = ({ route }) => {
  const { orderId } = route.params;

  const navigation = useNavigation<OrderDetailScreenNavigationProp>();
  const [activeTracking, setActiveTracking] = useState<number>(4);
  const [order, setOrder] = useState<OrderList>();
  const [loadding, setLoadding] = useState(false);
  const { setLoginInfo, login, user, logout } = useAuth();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  useEffect(() => {
    setLoadding(true);
    fetch(DETAIL_ORDER + '/' + orderId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setOrder(data.result);
        setLoadding(false);
      })
      .catch(error => {
        setLoadding(false);
      });
  }, []);
  const handleShopPress = (shopId, shopName) => {
    navigation.navigate('ShopDetail', { shopId: shopId, shopName });
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
  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <HeaderTab showBack={true} title="Chi tiết đơn hàng" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.trackingOrder}>
          <View style={styles.trackingOrderRelative}>
            <View style={styles.checkStepTracking}>
              <View
                style={[
                  styles.imgCheckingStep,
                  activeTracking > 0 && styles.activeItem,
                ]}
              >
                <Image source={require('../../media/icon/check.png')} style={styles.iconChecking} />
              </View>
              <Text style={styles.titleTrackingTimeline}>Đã đặt</Text>
              <Text style={styles.timeTrackingTimeLine}>{order?.created}</Text>
            </View>
            <View style={styles.checkStepTracking}>
              <View
                style={[
                  styles.imgCheckingStep,
                  activeTracking > 1 && styles.activeItem,
                ]}
              >
                <Image source={require('../../media/icon/check.png')} style={styles.iconChecking} />
              </View>
              <Text style={styles.titleTrackingTimeline}>Đã lấy</Text>
              <Text style={styles.timeTrackingTimeLine}>{order?.time_picked}</Text>
            </View>
            <View style={styles.checkStepTracking}>
              <View
                style={[
                  styles.imgCheckingStep,
                  activeTracking > 2 && styles.activeItem,
                ]}
              >
                <Image source={require('../../media/icon/check.png')} style={styles.iconChecking} />
              </View>
              {activeTracking != 4 ?
                <Text style={styles.titleTrackingTimeline}>Hoàn thành</Text>
                :
                <Text style={styles.titleTrackingTimeline}>Đơn đã hủy</Text>
              }

              <Text style={styles.timeTrackingTimeLine}>{order?.estimated_delivery_time}</Text>
            </View>

            <View style={[
              styles.hrStepOne,
              activeTracking > 1 && styles.activeItem,
            ]} ></View>
            <View style={[
              styles.hrStepTow,
              activeTracking > 2 && styles.activeItem,
            ]} ></View>
          </View>
        </View>
        {
          order?.driver ?
            <>
              <View style={styles.contactEmployee}>
                <View style={styles.employeeInfo}>
                  <Image source={require('../../media/icon/avatar_employee.png')} style={styles.avatarEmployee} />
                  <View style={styles.carNumberAndName}>
                    <View style={styles.nameWithRating}>
                      <Text style={styles.nameEmployee}>{order?.driver.full_name}</Text>
                      <View style={styles.ratingEmployee}>
                        <Image source={require('../../media/icon/star_employee.png')} style={styles.iconStar} />
                        <Text style={styles.countRating}>4.5</Text>
                      </View>
                    </View>
                    <Text style={styles.numberCar}>{order?.driver.phone_number}</Text>
                  </View>
                </View>
              </View>

            </>
            :
            <></>
        }


        <View style={styles.contactCustomer}>
          <Text style={styles.titleContactCustomer}>Giao hàng đến</Text>
          <View style={styles.loactionGroupCustomer}>
            <Image source={require('../../media/icon/location_customer.png')} style={styles.iconLocationCustomer} />
            <Text style={styles.locationCustomer}>{order?.destination_address}</Text>
          </View>
          <View style={styles.infoGroupCustomer}>
            <Image source={require('../../media/icon/icon_user.png')} style={styles.iconCustomer} />
            <Text style={styles.nameCustomer}>{order?.customer.full_name}</Text>
            <Text style={styles.phoneCustomer}>{order?.customer.phone_number}</Text>
          </View>
        </View>
        <View style={styles.orderDetail}>
          <View style={styles.storeNameActive}>
            <Text style={styles.titleStoreCardActive}>{order?.detail.shop_name}</Text>
            <TouchableOpacity onPress={() => handleShopPress(order?.shop_id, order?.detail.shop_name)} style={styles.groupTitleReadmoreStoreActive}>
              <Text style={styles.titleReadmoreStoreActive}>Xem quán</Text>
              <Image source={require('../../media/icon/readmore.png')} style={styles.icoReadmoreStoreActive} />
            </TouchableOpacity>
          </View>
          <View style={styles.listProducts}>
            {order?.order_personal_items && order?.order_personal_items.map((item, index) => (
              <View style={styles.itemProduct}>
                <Image source={require('../../media/icon/avt_product.png')} style={styles.imgProduct} />
                <View style={styles.infoProduct}>
                  <Text style={styles.nameProduct}>{item?.qty} x {item?.item_name}</Text>
                  <Text style={styles.descriptionProduct}>{order?.shop_information.description}</Text>
                </View>
                <Text style={styles.priceProduct}>{item?.total_price_format}</Text>
              </View>
            ))}


          </View>
        </View>
        <View style={styles.billingDetail}>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Tạm tính</Text>
            <Text style={styles.priceBilling}>{order?.total_amount_format}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Phí giao hàng (3.2 km)</Text>
            <Text style={styles.priceBilling}>{order?.ship_fee_format}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Mã khuyến mãi</Text>
            <Text style={styles.priceBilling}>0đ</Text>
          </View>
        </View>
        <View style={styles.billingDetail}>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Tổng cộng</Text>
            <Text style={styles.priceTotalBilling}>{order?.customer_pay_format}</Text>
          </View>
        </View>
        <View style={styles.orderDetailBank}>
          <View style={styles.storeNameActive}>
            <Text style={styles.titleStoreCardActive}>Chi tiết đơn hàng</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Mã đơn hàng</Text>
            <Text style={styles.priceBilling}>#{order?.id}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Thời gian đặt</Text>
            <Text style={styles.priceBilling}>{formatCreatedAt(order?.created_at)}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Phương thức thanh toán</Text>
            <Text style={styles.priceBilling}>Tiền mặt</Text>
          </View>
          {/* <TouchableOpacity style={styles.btnTryOrderOld}>
            <Text style={styles.btnTextTryOrderOld}>Đặt lại</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};
export const styles = StyleSheet.create({
  btnTextTryOrderOld: {
    color: "#2079FF",
    fontSize: 14
  },
  btnTryOrderOld: {
    width: "100%",
    backgroundColor: "#DBE9FF",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  orderDetailBank: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  priceTotalBilling: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold"
  },
  priceBilling: {
    fontSize: 14,
    color: "#000000",
  },
  titleBilling: {
    fontSize: 12,
    color: "#000000",
  },
  lineBilling: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5
  },
  billingDetail: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    alignItems: "flex-start",
    flexDirection: "column",
  },
  descriptionProduct: {
    fontSize: 8,
    color: "#848484",
    marginTop: 5
  },
  nameProduct: {
    fontSize: 12,
    color: "#000000"
  },
  priceProduct: {
    width: "20%",
    textAlign: "right",
    fontSize: 12,
    color: "#000000"
  },
  infoProduct: {
    width: "65%",
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: 'flex-start',
  },
  imgProduct: {
    width: 36,
    height: 36,
    borderRadius: 5
  },
  itemProduct: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10
  },
  listProducts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  storeNameActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  titleStoreCardActive: {
    fontSize: 14,
    color: '#000000',
    fontWeight: "bold"
  },
  groupTitleReadmoreStoreActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 10,
    width: 130
  },
  titleReadmoreStoreActive: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 12
  },
  icoReadmoreStoreActive: {
    width: 5,
    height: 9,
    objectFit: "cover"
  },
  orderDetail: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    alignItems: "flex-start",
    flexDirection: "column",
  },
  phoneCustomer: {
    fontSize: 14,
    color: "#000",
    lineHeight: 18
  },
  nameCustomer: {
    fontSize: 14,
    color: "#000",
    lineHeight: 18,
    paddingRight: 10,
    marginRight: 5,
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
  },
  iconCustomer: {
    objectFit: "cover",
    width: 12,
    height: 14,
    marginTop: 2
  },
  infoGroupCustomer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    columnGap: 10,
    marginTop: 10
  },
  locationCustomer: {
    fontSize: 14,
    color: "#000",
    lineHeight: 18,
    width: "90%"
  },
  iconLocationCustomer: {
    objectFit: "cover",
    width: 12,
    height: 14,
    marginTop: 4
  },
  loactionGroupCustomer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    columnGap: 10,
    marginTop: 10
  },
  titleContactCustomer: {
    width: "100%",
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000"
  },
  contactCustomer: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    alignItems: "flex-start",
    flexDirection: "column",
  },
  iconCallEmployee: {
    objectFit: "cover",
    width: 36,
    height: 36,
  },
  contactToEmployee: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5
  },
  numberCar: {
    fontSize: 12,
    color: "#000",
  },
  countRating: {
    fontSize: 10,
    color: "#000",
  },
  iconStar: {
    objectFit: "cover",
    width: 12,
    height: 12,
  },
  ratingEmployee: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5
  },
  nameEmployee: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
  },
  nameWithRating: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  carNumberAndName: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  avatarEmployee: {
    objectFit: "cover",
    width: 44,
    height: 44,
    borderRadius: 22
  },
  employeeInfo: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 10
  },
  contactEmployee: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  activeItem: {
    backgroundColor: "#2079FF",
  },
  hrStepTow: {
    position: "absolute",
    right: 50,
    top: 15,
    height: 2,
    width: "33%",
    backgroundColor: "#808080",
    zIndex: -1
  },
  hrStepOne: {
    position: "absolute",
    left: 50,
    top: 15,
    height: 2,
    width: "33%",
    backgroundColor: "#808080",
    zIndex: -1
  },
  timeTrackingTimeLine: {
    fontSize: 12,
    color: "#000000",
  },
  titleTrackingTimeline: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
    marginTop: 20
  },
  iconChecking: {
    width: 10,
    height: 6
  },
  imgCheckingStep: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#808080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  checkStepTracking: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "33%"
  },
  trackingOrderRelative: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    flexDirection: "row",
  },
  trackingOrder: {
    display: "flex",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    flexDirection: "row",
    paddingHorizontal: 20
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default OrderDetailScreen;
