// src/views/ProductList/ProductListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { getStores } from '../../services/HomeService';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../../models/Home';
import { styles } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FooterMenu from '../../components/FooterMenu';
import ImageSlider from 'react-native-image-slider';
import { PRODUCT_ENDPOINT, CATEGORY_ENDPOINT } from '../../constants/API';
import LoadingOverlay from '../../components/LoadingOverlay';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

type HomePageScreenNavigationProp = NavigationProp<RootStackParamList, 'HomePage'>;


const HomeScreen = () => {
  const { setLoginInfo, login, user, logout } = useAuth();
  const [loadding, setLoadding] = useState(false);
  const [activeButton, setActiveButton] = useState('home');
  const navigation = useNavigation<HomePageScreenNavigationProp>();
  const [keySearchI, setKeySearchI] = useState('');
  const [locationUser, setLocationUser] = useState({ "latitude": 10.7960147, "longitude": 106.6408417 });
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const images = [
    require('../../media/slider.png'),
    require('../../media/slider-2.png'),
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const [stores, setStores] = useState<Home>();
  // const { cart, addToCart } = useAuth();

  const handleShopPress = (shopId: number, shopName: string) => {
    navigation.navigate('ShopDetail', { shopId: String(shopId), shopName });
  };
  const handleFilterPage = (typeId: number, keySearch: string, name: string = "") => {
    navigation.navigate('FilterPage', { typeId, keySearch, name });
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationUser({ "latitude": position.coords.latitude, "longitude": position.coords.longitude });
      },
      (error) => {
        console.error("❌ Error fetching location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bạn đã cho phép truy cập vị trí');
      } else {
        console.log('Bạn đã từ chối truy cập vị trí');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
    setLoadding(true);
    getLocation();
    console.log(locationUser);

    fetch(PRODUCT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        "user_lat": locationUser.latitude,
        "user_long": locationUser.longitude
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        setStores(data.result);
      })
      .catch(error => {
        setLoadding(false);
      });


    fetch(CATEGORY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        setCategories(data.result.data);
      })
      .catch(error => {
        setLoadding(false);
      });

  }, []);


  const renderHeader = () => (
    <View>
      <View style={styles.sliders}>
        <ImageSlider
          loopBothSides
          images={images}
          customSlide={({ index, item, style, width }) => (
            <View key={index} style={[style, styles.customSlide]}>
              <Image source={item} style={{ width, height: 150 }} />
            </View>
          )}
        />
      </View>
      <View style={styles.container_category}>
        {categories.map(category => (
          <TouchableOpacity key={category.id} onPress={() => handleFilterPage(5, category.id.toString(), category.name)} >
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Icon name={category.icon} size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.text}>{category.name}</Text>
            </View>
          </TouchableOpacity>

        ))}
      </View>
      <View style={styles.content_cuahang}>
        <View style={styles.searchData}>
          <Icon name="search" size={16} style={styles.iconSearch} onPress={() => handleFilterPage(1, keySearchI)} />
          <TextInput
            placeholder="Bạn tìm kiếm gì ?"
            style={styles.inputSearch}
            placeholderTextColor="#000"
            value={keySearchI}
            onChangeText={setKeySearchI}
          />
        </View>
        {stores?.stores_with_most_vouchers && stores?.stores_with_most_vouchers.length > 0 && (
          <View style={styles.titleGroup}>
            <Text style={styles.titleLeft}>Quán Deal Hot</Text>
            <TouchableOpacity onPress={() => handleFilterPage(2, "")} >
              <Text style={styles.readMoreRight}>Xem Thêm →</Text>
            </TouchableOpacity>
          </View>
        )}
        {stores?.stores_with_most_vouchers && stores?.stores_with_most_vouchers.length > 0 && (
          <Text style={styles.descriptTitle}>Các quán có nhiều deal hot</Text>
        )}
        {stores?.stores_with_most_vouchers && stores?.stores_with_most_vouchers.length > 0 && (
          <View style={styles.listStores}>
            <FlatList
              data={stores?.stores_with_most_vouchers}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
                  <View style={styles.itemContainerStores}>
                    <Image source={{ uri: item.avatar_files }} style={styles.imageStores} />
                    <View style={styles.titleStoresGroup}>
                      <Image source={require('../../media/icon/check_title.png')} style={styles.iconTitleStores} />
                      <Text style={styles.titleStores}>{item.name}</Text>
                    </View>

                    <View style={styles.starLocaitonGroup}>
                      <View style={styles.starGroup}>
                        <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
                        <Text style={styles.starTitle}>{item.averageStarRating}</Text>
                      </View>
                      <View style={styles.locationGroup}>
                        <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
                        <Text style={styles.locationTitle}>{item.distance}</Text>
                      </View>
                    </View>

                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}
        {stores?.new_stores && stores?.new_stores.length > 0 && (
          <View style={styles.hrLine}></View>
        )}
        {stores?.new_stores && stores?.new_stores.length > 0 && (
          <View style={styles.titleGroup}>
            <Text style={styles.titleLeft}>Quán Mới Mở</Text>
            <TouchableOpacity onPress={() => handleFilterPage(3, "")} >
              <Text style={styles.readMoreRight}>Xem Thêm →</Text>
            </TouchableOpacity>
          </View>
        )}
        {stores?.new_stores && stores?.new_stores.length > 0 && (
          <Text style={styles.descriptTitle}>Các quán mới mở quanh đây</Text>
        )}
        {stores?.new_stores && stores?.new_stores.length > 0 && (
          <View style={styles.listStores}>
            <FlatList
              data={stores?.new_stores}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
                  <View style={styles.itemContainerStores}>
                    <Image source={{ uri: item.avatar_files }} style={styles.imageStores} />
                    <View style={styles.titleStoresGroup}>
                      <Image source={require('../../media/icon/check_title.png')} style={styles.iconTitleStores} />
                      <Text style={styles.titleStores}>{item.name}</Text>
                    </View>

                    <View style={styles.starLocaitonGroup}>
                      <View style={styles.starGroup}>
                        <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
                        <Text style={styles.starTitle}>{item.averageStarRating}</Text>
                      </View>
                      <View style={styles.locationGroup}>
                        <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
                        <Text style={styles.locationTitle}>{item.distance}</Text>
                      </View>
                    </View>

                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => `flat_item_${item.id}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        )}
        {/* Quán Gần Đây */}
        {stores?.new_stores && stores?.new_stores.length > 0 && (
          <View style={styles.hrLine}></View>
        )}
        {stores?.all_nearby_stores && stores?.all_nearby_stores.length > 0 && (
          <View style={styles.titleGroup}>
            <Text style={styles.titleLeft}>Quán Gần Đây</Text>
            <TouchableOpacity onPress={() => handleFilterPage(4, "")} >
              <Text style={styles.readMoreRight}>Xem Thêm →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <View style={styles.contentContainer}>
        <FlatList
          data={stores?.all_nearby_stores}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
              <View style={styles.itemContainerStoresLine}>
                <Image source={{ uri: item.avatar_files }} style={styles.imageStoresLine} resizeMode="cover" />
                <View style={styles.groupInfoStoreLine} >
                  <View style={styles.groupDesTitle}>
                    <View style={styles.titleStoresGroupLine}>
                      <Image source={require('../../media/icon/check_title.png')} style={styles.iconTitleStores} />
                      <Text style={styles.titleStores}>{item.name}</Text>
                    </View>
                    <Text style={styles.descriptionStore}>{item.description}</Text>
                  </View>
                  <View style={styles.starLocaitonGroup}>
                    <View style={styles.starGroup}>
                      <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
                      <Text style={styles.starTitle}>{item.averageStarRating}</Text>
                    </View>
                    <View style={styles.locationGroup}>
                      <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
                      <Text style={styles.locationTitle}>{item.distance} </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.hrLine}></View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View>
        {/* <FooterMenu active={activeButton} /> */}
      </View>
    </View>
  );
};

export default HomeScreen;
