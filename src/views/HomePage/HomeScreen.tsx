// src/views/ProductList/ProductListScreen.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../../models/Home';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageSlider from 'react-native-image-slider';
import { PRODUCT_ENDPOINT, CATEGORY_ENDPOINT } from '../../constants/API';
import LoginScreen from '../Login/LoginScreen';
import { requestLocationPermission } from '@/utils/permissions';
import { getLocation } from '@/utils/location';
import { SkeletonHeader } from '@/components/SkeletonHeader';

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

const HomeScreen = ({ navigation }) => {
  const { login, user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    if (!user) {
      setVisibleLoginScreen(true);
      return;
    }
    navigation.navigate('ShopDetail', { shopId: String(shopId), shopName });
  };
  const handleFilterPage = (typeId: number, keySearch: string, name: string = "") => {
    navigation.navigate('FilterPage', { typeId, keySearch, name });
  };

  const isMountedRef = useRef(true);

  // ✅ Hàm getData có thể tái sử dụng
  const getData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      // 1️⃣ Xin quyền vị trí
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      // 2️⃣ Lấy vị trí
      const location = await getLocation();

      if (!isMountedRef.current) return;

      setLocationUser(location);

      // 3️⃣ Call API song song
      const [productResponse, categoryResponse] = await Promise.all([
        fetch(PRODUCT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_lat: location.latitude,
            user_long: location.longitude,
          }),
        }),
        fetch(CATEGORY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      ]);

      // 4️⃣ Kiểm tra response status
      if (!productResponse.ok || !categoryResponse.ok) {
        throw new Error('API request failed');
      }

      // 5️⃣ Parse response
      const [productData, categoryData] = await Promise.all([
        productResponse.json(),
        categoryResponse.json(),
      ]);

      if (!isMountedRef.current) return;

      // 6️⃣ Set state
      setStores(productData?.result ?? []);
      setCategories(categoryData?.result?.data ?? []);

      return { success: true };
    } catch (error) {
      console.warn('❌ Get data error:', error);

      // Có thể hiện Toast/Alert ở đây
      // showToast('Không thể tải dữ liệu');

      return { success: false, error };
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  // ✅ Load lần đầu
  useEffect(() => {
    getData(true);

    return () => {
      isMountedRef.current = false;
    };
  }, [getData]);

  // ✅ Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData(true); // Không hiện loading overlay
  }, [getData]);

  const [visibleLoginScreen, setVisibleLoginScreen] = useState(false);

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
                    <Image source={{ uri: item.avatar }} style={styles.imageStores} />
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
                    <Image source={{ uri: item.avatar }} style={styles.imageStores} />
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
      {
        visibleLoginScreen &&
        <LoginScreen
          isVisible={visibleLoginScreen}
          onClose={() => {
            setVisibleLoginScreen(false);
            navigation.navigate('MainTabs', { screen: 'Home' });
          }} onRegister={() => {
            setVisibleLoginScreen(false);
            navigation.navigate('RegisterPage', {
              onLoginPress: () => {
                setVisibleLoginScreen(true);
              }
            });
          }} />
      }
      <View style={styles.contentContainer}>
        <FlatList
          data={stores?.all_nearby_stores}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={loading ? <SkeletonHeader /> : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']} // Android
              tintColor="#007AFF" // iOS
              title="Đang tải..." // iOS
              titleColor="#666" // iOS
            />
          }
          renderItem={({ item }) => {
            if (loading) {
              return null
            }
            return (
              <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
                <View style={styles.itemContainerStoresLine}>
                  <Image source={{ uri: item.avatar }} style={styles.imageStoresLine} resizeMode="cover" />
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
            )
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View>
      </View>
    </View>
  );
};

export default HomeScreen;
