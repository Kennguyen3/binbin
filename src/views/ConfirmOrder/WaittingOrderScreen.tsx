import React, { useState, useEffect, useRef } from 'react';

import { View, Image, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useAuth } from '../../context/AuthContext';
import { OrderResponseDetail } from '../../models/OrderCreate';
import { GET_DETAIL_ORDER, CANCEL_ORDER } from '../../constants/API';
import { showMessage } from "react-native-flash-message";

import FooterMenu from '../../components/FooterMenu';
type WaittingOrderScreenNavigationProp = NavigationProp<RootStackParamList, 'WaittingOrder'>;

interface ConfirmOrderProps {
  route: {
    params: {
      id: number;
    };
  };

}

const WaittingOrderScreen: React.FC<ConfirmOrderProps> = ({ route }) => {

  // Format time as HH:MM
  const formatTime = (date: { getHours: () => any; getMinutes: () => any; }) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [activeButton, setActiveButton] = useState('');
  const navigation = useNavigation<WaittingOrderScreenNavigationProp>();
  const [id, setId] = useState<number>(route.params.id);
  const [loadding, setLoadding] = useState(false);
  const { setLoginInfo, login, user, logout } = useAuth();
  const [order, setOrder] = useState<OrderResponseDetail>();
  const [showGet, setShowGet] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<number>(0);

  const [statuses, setStatuses] = React.useState(['Đã đặt', 'Đã lấy', 'Hoàn thành']);
  const [times, setTimes] = React.useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const successOrder = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    navigation.navigate('HomePage');
    return;
  };

  const cancelOrder = () => {
    setLoadding(true);
    const jsonData = {
      order_id: id,
      "cancel_type": "canceled"
    };
    fetch(CANCEL_ORDER, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then((data: any) => {
        if (data.success == true) {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          navigation.navigate('HomePage');
          setLoadding(false);
          return;
        }
      })
      .catch(error => {
        setLoadding(false);
      });
  };

  const reloadOrder = () => {

    fetch(GET_DETAIL_ORDER + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then((data: { result: OrderResponseDetail }) => {
        setOrder(data.result);
        setSelectedIndex(data.result?.status ? data.result?.status : 0);
        const time_line = [];
        time_line.push(data.result?.created ? data.result?.created : "");
        time_line.push(data.result?.time_accepted ? data.result?.time_accepted : "");
        time_line.push(data.result?.time_picked ? data.result?.time_picked : "");
        setTimes(time_line);
        if (data.result?.status == 1 && showGet == 0) {
          showMessage({
            message: "Thông báo",
            description: "Đơn hàng được được tài xê đến lấy.",
            type: "info",
            onPress: () => {
              console.log("Thông báo đã bị đóng");
            }
          });
          setShowGet(1);
        }
        if (data.result?.status == 4 && showSuccess == 0) {
          showMessage({
            message: "Thông báo",
            description: "Đơn hàng đã hoàn thành.",
            type: "info",
            onPress: () => {
              console.log("Thông báo đã bị đóng");
            }
          });
          setShowSuccess(1);
        }
        if (data.result?.status != undefined && data.result?.status < 4) {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          timeoutIdRef.current = setTimeout(() => {
            reloadOrder();
          }, 5000);
        }

      })
      .catch(error => {
      });


  };

  useEffect(() => {
    setLoadding(true);
    fetch(GET_DETAIL_ORDER + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then((data: { result: OrderResponseDetail }) => {
        setOrder(data.result);
        setSelectedIndex(data.result.status ? data.result.status : 0);
        const time_line = [];
        time_line.push(data.result?.created ? data.result?.created : "");
        time_line.push(data.result?.time_accepted ? data.result?.time_accepted : "");
        time_line.push(data.result?.time_picked ? data.result?.time_picked : "");
        setTimes(time_line);
        setLoadding(false);
        if (data.result?.status != undefined && data.result?.status < 4) {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          timeoutIdRef.current = setTimeout(() => {
            reloadOrder();
          }, 5000);
        }
      })
      .catch(error => {
        setLoadding(false);
      });


  }, []);
  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={require('../../media/map_banner.png')} style={styles.banner_map} />
        <View style={styles.view_traker}>
          <Text style={styles.deliveryTime}>Dự kiến giao : {order?.estimated_delivery_time ? order?.estimated_delivery_time : ""} Hôm nay</Text>
          <View style={styles.container}>
            <Text style={styles.title}>Tài xế đang lấy đơn</Text>
            <View style={styles.trackerContainer}>
              <View style={[
                styles.border_1,
                selectedIndex >= 1 && styles.selectedTrackerPoint,
              ]}></View>
              <View style={[
                styles.border_2,
                selectedIndex == 4 && styles.selectedTrackerPoint,
              ]}></View>

              {statuses.map((status, index) => (
                <View style={styles.group_checkbox}>
                  <View
                    key={index}
                    style={[
                      styles.trackerPoint,
                      (selectedIndex >= index && (selectedIndex != 2 || index != 2)) && styles.selectedTrackerPoint,
                    ]}
                  >
                    {(selectedIndex == 4 && 2 == index) && <View style={styles.checkMark} />}

                  </View>

                  <Text key={index} style={styles.label}>
                    {status}
                  </Text>
                  <Text style={styles.time_line}>{times[index] ? times[index] : ''}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.container_new_info}>

          {order?.driver && order?.driver != null ?
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
              <View style={styles.contactToEmployee}>
                <Image source={require('../../media/icon/call_employee.png')} style={styles.iconCallEmployee} />
                <Image source={require('../../media/icon/chat_employee.png')} style={styles.iconCallEmployee} />
              </View>
            </View>
            : null}
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
              <Text style={styles.titleStoreCardActive}>{order?.shop_information.name}</Text>
              {/* <TouchableOpacity style={styles.groupTitleReadmoreStoreActive}>
                <Text style={styles.titleReadmoreStoreActive}>Xem quán</Text>
                <Image source={require('../../media/icon/readmore.png')} style={styles.icoReadmoreStoreActive} />
              </TouchableOpacity> */}
            </View>
            <View style={styles.listProducts}>
              {order?.order_personal_items && order?.order_personal_items.length > 0 && (
                <FlatList
                  data={order?.order_personal_items}
                  renderItem={({ item }) => (

                    <View style={styles.itemProduct}>
                      <Image source={{ uri: item.image_files }} style={styles.imgProduct} />
                      <View style={styles.infoProduct}>
                        <Text style={styles.nameProduct}>{item.qty} x {item.item_name}</Text>
                        <Text style={styles.descriptionProduct}>{item.item_name}</Text>
                      </View>
                      <Text style={styles.priceProduct}>{item.total_price_format}</Text>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                />
              )}


            </View>
          </View>
          <View style={styles.billingDetail}>
            <View style={styles.lineBilling}>
              <Text style={styles.titleBilling}>Tạm tính</Text>
              <Text style={styles.priceBilling}>{order?.total_amount_format}</Text>
            </View>
            <View style={styles.lineBilling}>
              <Text style={styles.titleBilling}>Phí giao hàng ({order?.distance} km)</Text>
              <Text style={styles.priceBilling}>{order?.ship_fee_format}</Text>
            </View>
            {/* <View style={styles.lineBilling}>
              <Text style={styles.titleBilling}>Mã khuyến mãi</Text>
              <Text style={styles.priceBilling}>0đ</Text>
            </View> */}
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
              <Text style={styles.priceBilling}>{order?.created}-{order?.day}</Text>
            </View>
            <View style={styles.lineBilling}>
              <Text style={styles.titleBilling}>Phương thức thanh toán</Text>
              <Text style={styles.priceBilling}>Tiền mặt</Text>
            </View>
            {selectedIndex == 0 && <TouchableOpacity style={styles.btnTryOrderOldRed}>
              <Text onPress={cancelOrder} style={styles.btnTextTryOrderOldRed}>Huỷ Đơn Hàng</Text>
            </TouchableOpacity>}

            {(selectedIndex == 1 || selectedIndex == 2 || selectedIndex == 3) && <TouchableOpacity style={styles.btnTryOrderOldBlack}>
              <Text style={styles.btnTextTryOrderOldBlack}>Đang Giao</Text>
            </TouchableOpacity>}

            {selectedIndex == 4 && <TouchableOpacity onPress={successOrder} style={styles.btnTryOrderOld}>
              <Text style={styles.btnTextTryOrderOld}>Hoàn Thành</Text>
            </TouchableOpacity>}


          </View>
        </View>
      </ScrollView>
      <View>
        <FooterMenu active={activeButton} />
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  view_traker: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 80,
    padding: 20,
    zIndex: 101
  },
  banner_map: {
    width: Dimensions.get('window').width,
    height: 100,
    objectFit: "cover",
    zIndex: 100,
    position: "absolute",
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    width: "100%"
  },
  deliveryTime: {
    fontSize: 12,
    color: '#2079FF',
    backgroundColor: "#DBE9FF",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  deliveryInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  status: {
    fontSize: 16,
  },
  time: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'right',
  },
  container_new_info: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trackerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  group_checkbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    position: "relative",
    width: "33%"
  },
  border_1: {
    position: "absolute",
    left: "26%",
    borderWidth: 1,
    borderColor: '#DBE9FF',
    width: "26%",
    top: 15
  },
  border_2: {
    position: "absolute",
    right: "26%",
    borderWidth: 1,
    borderColor: '#DBE9FF',
    width: "26%",
    top: 15
  },
  trackerPoint: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#DBE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedTrackerPoint: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  checkMark: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  time_line: {
    fontSize: 12,
    color: 'gray',
  },
  btnTextTryOrderOldRed: {
    color: "#EB2619",
    fontSize: 14
  },

  btnTextTryOrderOldBlack: {
    color: "#fff",
    fontSize: 14
  },
  btnTryOrderOldBlack: {
    width: "100%",
    backgroundColor: "#D6D6D6",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  btnTryOrderOldRed: {
    width: "100%",
    backgroundColor: "#FFDAD7",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 20,
    paddingTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
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
});

export default WaittingOrderScreen;
