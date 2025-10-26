import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Dimensions, Alert, TouchableWithoutFeedback, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HeaderTab from '../../components/HeaderTab';
import { OrderCreate, ProductsOrder, OrderResponseCreate } from '../../models/OrderCreate';
import { formatToVND } from '../../utils/currencyUtils';
import { Distance } from '../../models/Distance';
import { GET_DISTANCE, POST_ORDER } from '../../constants/API';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useAuth } from '../../context/AuthContext';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

type ConfirmOrderScreenNavigationProp = NavigationProp<RootStackParamList, 'ConfirmOrder'>;

interface ConfirmOrderProps {
  route: {
    params: {
      data: OrderCreate;
    };
  };

}
const ConfirmOrderScreen: React.FC<ConfirmOrderProps> = ({ route }) => {
  const navigation = useNavigation<ConfirmOrderScreenNavigationProp>();
  const [orders, setOrders] = useState<OrderCreate>(route.params.data);
  const [note, setNote] = useState('');
  const [distances, setDistances] = useState<Distance | null>(null);
  const [loadding, setLoadding] = useState(false);
  const { setLoginInfo, login, user, logout } = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const [showMenu, setShowMenu] = useState(false);
  const [locationAddress, setLocationAddress] = useState("");
  const [locationDefault, setLocationDefault] = useState({
    latitude: 10.0161,
    longitude: 105.2416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleOpenLoaciton = () => {
    setShowMenu(true);
  };
  const getCurrentDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const submitOrder = () => {
    if (!orders.address_shipping) {
      Alert.alert('Chọn địa chỉ giao hàng.');
      return;
    }

    setLoadding(true);

    const itemsArray: { name: string | undefined; qty: number; product_id: number; }[] = [];
    orders?.products?.forEach((item) => {
      itemsArray.push({
        name: item.title,
        qty: item.qty,
        product_id: item.product_id
      });
    });

    const jsonData = {
      shop_id: orders?.id_store,
      destination_address: orders?.address_shipping,
      destination_lat: locationDefault?.latitude,
      destination_long: locationDefault?.longitude,
      pay_type: 'cash',
      responsive: 'cash',
      day: getCurrentDate(),
      tip: 0,
      operating_system: 'IOS',
      note: note,
      items: itemsArray
    };
    
    fetch(POST_ORDER, {
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
          setLoadding(false);
          navigation.navigate('WaittingOrder', { id: data.result.detail.order_id });
          return;
        }
      })
      .catch(error => {
        setLoadding(false);
      });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };
  const fetchLocationAndProceed = async () => {
    try {
      const location = await getLocation();
      console.log(location);

      setLocationDefault(location);
      fetch(GET_DISTANCE, {
        method: 'POST',
        body: JSON.stringify({
          "shop_id": orders?.id_store,
          "lat": location.latitude,
          "lng": location.longitude
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.access_token}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.result);

          setOrders((prevOrders) => ({
            ...prevOrders,
            price_shipping: data.result?.shipping_cost ? data.result?.shipping_cost : 0,
            address_shipping: data.result?.destination_address
          }));
          setLoadding(false);
          setDistances(data.result);
        })
        .catch(error => {
          setLoadding(false);
        });
      // Tiếp tục các xử lý khác sau khi lấy được location
    } catch (error) {
      console.error("❌ Error fetching location:", error);
    }
  };

  const handleConfirmLocation = () => {
    if (locationAddress == "" && orders.address_shipping == "") {
      Alert.alert('Chọn địa chỉ của bạn trước khi sử dụng ứng dụng');
      return;
    } else if (locationAddress == "" && orders.address_shipping != "") {
      setShowMenu(false);
      return;
    }
    setOrders(prevState => ({
      ...prevState,
      address_shipping: locationAddress,
    }));
    setShowMenu(false);
  };
  const handlePress = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {

    const addressComponents = details?.address_components || [];
    const isInCaMau = addressComponents.some(component =>
      component.long_name.includes('Cà Mau') || component.short_name.includes('Cà Mau')
    );

    if (isInCaMau) {
      setLoadding(true);
      const fullAddress = details?.formatted_address || '';
      // Lấy tọa độ
      const latitude = details?.geometry?.location.lat || 0;
      const longitude = details?.geometry?.location.lng || 0;
      setLocationAddress(fullAddress);
      setLocationDefault({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetch(GET_DISTANCE, {
        method: 'POST',
        body: JSON.stringify({
          "shop_id": orders?.id_store,
          "lat": latitude,
          "lng": longitude
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.access_token}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.result);

          setOrders((prevOrders) => ({
            ...prevOrders,
            price_shipping: data.result.shipping_cost,
            address_shipping: data.result.destination_address
          }));
          setLoadding(false);
          setDistances(data.result);
        })
        .catch(error => {
          setLoadding(false);
        });

    } else {
      Alert.alert('Khu vực của bạn chưa được hỗ trợ, vui lòng chọn địa chỉ trong tỉnh càu mau');
    }
  };
  useEffect(() => {
    setLoadding(true);
    fetchLocationAndProceed();

  }, []);



  const renderProductItem = ({ item }: { item: ProductsOrder }) => (
    <View style={styles.itemProduct}>
      <Image source={{ uri: item.img }} style={styles.imgProduct} />
      <View style={styles.infoProduct}>
        <Text style={styles.nameProduct}>{item.qty} x {item.title}</Text>
        <Text style={styles.descriptionProduct}>{item.description}</Text>
      </View>
      <Text style={styles.priceProduct}>{formatToVND(item.price)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <HeaderTab showBack={true} title="Xác nhận đơn hàng" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.contactCustomer}>
          <Text style={styles.titleContactCustomer}>Giao hàng đến</Text>
          <TouchableOpacity style={styles.loactionGroupCustomer} onPress={handleOpenLoaciton}>
            <Image source={require('../../media/icon/location_customer.png')} style={styles.iconLocationCustomer} />
            <Text style={styles.locationCustomer}>{orders.address_shipping}</Text>
          </TouchableOpacity>
          <View style={styles.infoGroupCustomer}>
            <Image source={require('../../media/icon/icon_user.png')} style={styles.iconCustomer} />
            <Text style={styles.nameCustomer}>{orders.name_user}</Text>
            <Text style={styles.phoneCustomer}>{orders.phone_user}</Text>
          </View>
        </View>
        <View style={styles.orderDetail}>
          <View style={styles.storeNameActive}>
            <Text style={styles.titleStoreCardActive}>Danh sách món ăn</Text>
          </View>
          <View style={styles.listProducts}>
            <FlatList
              data={orders.products}
              renderItem={renderProductItem}
              keyExtractor={(product) => product.product_id.toString()}
            />
          </View>
        </View>
        <View style={styles.billingDetail}>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Tạm tính</Text>
            <Text style={styles.priceBilling}>{formatToVND(orders.total_price_product)}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Phí giao hàng ({distances?.distance})</Text>
            <Text style={styles.priceBilling}>{formatToVND(orders.price_shipping)}</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Mã khuyến mãi</Text>
            <Text style={styles.priceBilling}>{formatToVND(orders.price_sale)}</Text>
          </View>
        </View>
        <View style={styles.billingDetail}>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Tổng cộng</Text>
            <Text style={styles.priceTotalBilling}>{formatToVND(orders.total_price_product + orders.price_shipping + orders.price_sale)}</Text>
          </View>
        </View>
        <View style={styles.billingDetail}>
          <View style={styles.storeNameActive}>
            <Text style={styles.titleStoreCardActive}>Ghi chú cho tài xế</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nhập ghi chú"
            value={note}
            onChangeText={setNote}
            multiline={true} // Cho phép nhiều dòng
            numberOfLines={4}
          />
        </View>
        <View style={styles.orderDetailBank}>
          {/* <View style={styles.storeNameActive}>
            <Text style={styles.titleStoreCardActive}>Cách thanh toán</Text>
          </View>
          <View style={styles.lineBilling}>
            <Text style={styles.titleBilling}>Tiền mặt</Text>
            <Image source={require('../../media/icon/readmore.png')} style={styles.icoReadmoreStoreActive} />
          </View> */}

          <TouchableOpacity onPress={submitOrder} style={styles.btnTryOrderOld}>
            <Text style={styles.btnTextTryOrderOld}>Đặt đơn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showMenu ? (
        <View style={styles.menuSearchLocation}>
          <View style={styles.contentChooseLoaction}>

            <View style={styles.contentMapSearch}>
              <GooglePlacesAutocomplete
                placeholder="Tìm kiếm địa chỉ"
                minLength={2}
                fetchDetails={true}
                onPress={handlePress}
                currentLocationLabel="Current location"
                currentLocation={true}
                textInputProps={{
                  defaultValue: orders.address_shipping, // ✅ Địa chỉ mặc định hiển thị
                }}
                query={{
                  key: 'AIzaSyBRIG2gddg_sKp76UJSgYZOlI-e5-egVQA',
                  language: 'vi',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                onFail={error => console.error(error)}
                styles={{
                  textInputContainer: styles.textInputContainerMap,
                  textInput: styles.textInputMap,
                }}
              />
            </View>

            <MapView
              style={styles.mapView}
              region={locationDefault}
            >
              <Marker
                coordinate={{
                  latitude: locationDefault.latitude,
                  longitude: locationDefault.longitude
                }}
                title="Vị trí Cà Mau"
                description="Đây là vị trí của Cà Mau"
              />
            </MapView>
            <TouchableWithoutFeedback onPress={handleConfirmLocation}>
              <Text style={styles.btnNext}>Sử dụng vị trí này</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};
export const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
    width: '100%',
    marginTop: 20
  },
  btnTextTryOrderOld: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold'
  },
  btnTryOrderOld: {
    width: "100%",
    backgroundColor: "#2079FF",
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
    marginBottom: 5,
    marginTop: 10
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
    fontSize: 12,
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
    lineHeight: 18
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
    marginTop: 10,
    width: "90%"
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
  menuSearchLocation: {
    position: 'absolute',
    zIndex: 12,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  contentChooseLoaction: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    zIndex: 12,
    bottom: 0,
    left: 0,
    padding: 20,
    flex: 1
  },
  contentMapSearch: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 12,
    top: 20,
    left: 20,
    width: '100%'
  },
  textInputContainerMap: {
    width: '100%',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    height: 40,
  },
  textInputMap: {
    backgroundColor: '#ddd',
    height: 40,
  },
  mapView: {
    width: '100%',
    height: 200,
    marginBottom: 10
  },
  btnNext: {
    width: '100%',
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#2079FF',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10
  },
});

export default ConfirmOrderScreen;
