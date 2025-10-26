// src/views/Login/LoginScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesVerifyLocation';
import { useAuth } from '../../context/AuthContext';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import LoadingOverlay from '../../components/LoadingOverlay';
import { UPDATE_ADDRESS_PROFILE, GETFULL_ADDRESS_PROFILE } from '../../constants/API';
import Geolocation from 'react-native-geolocation-service';

type VerifyLocationScreenNavigationProp = NavigationProp<RootStackParamList, 'VerifyLocation'>;

const VerifyLocationScreen = () => {

  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation<VerifyLocationScreenNavigationProp>();
  const [locationAddress, setLocationAddress] = useState("");

  const [fullName, setFullName] = useState('');
  const { user, updateActiveAddress, updateActiveFullName } = useAuth();
  const [loadding, setLoadding] = useState(false);

  const [fullAddress, setFullAddress] = useState('');
  const [locationDefault, setLocationDefault] = useState({
    latitude: 10.0161,
    longitude: 105.2416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationDefault({ 
          "latitude": position.coords.latitude, 
          "longitude": position.coords.longitude , 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
        getFullAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("❌ Error fetching location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getFullAddress = (lat: any, long: any) => {
    fetch(GETFULL_ADDRESS_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "lat" : lat,
        "lng" :  long
      }),
    })
      .then(response => response.json())
      .then(data => {
        setFullAddress(data.result);
        setLocationAddress(data.result);
      })
      .catch(error => {});
  };

  const handleLogin = () => {
    if (fullName == "") {
      Alert.alert('Vui lòng nhập họ tên.');
      return;
    }
    setLoadding(true);

    fetch(UPDATE_ADDRESS_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "phone_number": user?.phone_number,
        "address": locationAddress,
        "name": fullName,
        "default": "1"
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        updateActiveAddress();
        updateActiveFullName(fullName);
        navigation.navigate('HomePage');
        return;
      })
      .catch(error => {
        setLoadding(false);
        Alert.alert(error);
      });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleOpenLoaciton = () => {
    setShowMenu(true);
  };
  const handleCloseLoaciton = () => {
    setShowMenu(false);
  };
  
  const handleConfirmLocation = () => {
    if (locationAddress == "") {
      Alert.alert('Chọn địa chỉ của bạn trước khi sử dụng ứng dụng');
      return;
    }
    setShowMenu(false);
  };

  const handlePress = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {


    const addressComponents = details?.address_components || [];
    const isInCaMau = addressComponents.some(component =>
      component.long_name.includes('Cà Mau') || component.short_name.includes('Cà Mau')
    );

    if (isInCaMau) {
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
    } else {
      Alert.alert('Khu vực của bạn chưa được hỗ trợ, vui lòng chọn địa chỉ trong tỉnh càu mau');
    }
  };

  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <View style={styles.header_navbar}>
        <TouchableOpacity style={styles.backHeader} onPress={() => handleGoBack()}>
          <Image source={require('../../media/icon/back_screen.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.welcome}>Nhập vị trí</Text>
      </View>
      <Text style={styles.desctionBlack}>Để thuận tiện cho việc giao hàng chính xác đia điểm.
        Vui lòng kiểm tra thông tin bên dưới</Text>

      <Text style={styles.placeholder}>Họ và tên :</Text>
      <View style={styles.groupInputText}>
        <TextInput
          style={styles.inputText}
          placeholder="Nhập họ và tên"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <Text style={styles.placeholder}>Địa chỉ giao hàng của bạn</Text>
      {locationAddress != "" ?
        <View style={styles.groupLocation}>
          <Image
            source={require('../../media/icon/location_blue.png')} // Đường dẫn đến logo Facebook
            style={styles.iconLocation}
          />
          <Text style={styles.textLocation}>{locationAddress}</Text>
        </View>
        :
        <Text style={styles.desctionBlack}>Vui lòng chọn địa chỉ trong khu vực tỉnh Cà Mau để tiếp tục mua hàng</Text>
      }

      {locationAddress != "" ?
        <TouchableWithoutFeedback onPress={handleLogin}>
          <Text style={styles.btnNext}>Sử dụng vị trí này</Text>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={handleOpenLoaciton}>
          <Text style={styles.btnNext}>Chọn vị trí</Text>
        </TouchableWithoutFeedback>
      }
      {locationAddress != "" ?
        <TouchableOpacity style={styles.buttonLogin} onPress={handleOpenLoaciton}>
          <Text style={styles.buttonTextLogin}>Thay đổi vị trí</Text>
        </TouchableOpacity>
        : ""}

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
                  defaultValue: fullAddress, // ✅ Địa chỉ mặc định hiển thị
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
                  olor: 'black',
                  listView: {
                    backgroundColor: 'white', // Màu nền danh sách gợi ý
                  },
                  row: {
                    backgroundColor: 'white', // Nền mỗi dòng gợi ý
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#black',
                  },
                  description: {
                    color: 'black', // Màu chữ danh sách gợi ý
                    fontSize: 16,
                  },
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

export default VerifyLocationScreen;
