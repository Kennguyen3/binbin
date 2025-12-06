
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesWishlist';
import { useAuth } from '../../context/AuthContext';
import { LIST_FAVORITE } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import { Store } from '../../models/Store';
import LoadingOverlay from '../../components/LoadingOverlay';
import LoginScreen from '../Login/LoginScreen';

const WishlistScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('wishlist');
  const [loadding, setLoadding] = useState(false);
  const { user } = useAuth();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);
  const handleShopPress = (shopId: number, shopName: string) => {
    navigation.navigate('ShopDetail', { shopId: String(shopId), shopName });
  };
  const [products, setProducts] = useState<Store[]>([]);

  useEffect(() => {
    setLoadding(true);

    fetch(LIST_FAVORITE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        setProducts(data.result.all_nearby_stores);
      })
      .catch(error => {
        setLoadding(false);
      });


  }, []);

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
      <HeaderTab showBack={false} title="Quán yêu thích" />
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content_cuahang}>
          {products && products.length > 0 && (
            <View style={[styles.listStores, styles.mgT10]}>
              <FlatList
                data={products}
                renderItem={({ item }) => (
                  <View>
                    <View style={styles.itemContainerStoresLine}>
                      <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
                        <Image source={{ uri: item.avatar_files }} style={styles.imageStoresLine} resizeMode="cover" />
                      </TouchableOpacity>
                      <View style={styles.groupInfoStoreLine} >
                        <TouchableOpacity style={styles.groupDesTitle} onPress={() => handleShopPress(item.id, item.name)}>
                          <View style={styles.titleStoresGroupLine}>
                            <Image source={require('../../media/icon/check_title.png')} style={styles.iconTitleStores} />
                            <Text style={styles.titleStores}>{item.name}</Text>
                          </View>
                          <Text style={styles.descriptionStore}>{item.description}</Text>
                        </TouchableOpacity>
                        <View style={styles.starLocaitonGroup}>
                          <View style={styles.starGroup}>
                            <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
                            <Text style={styles.starTitle}>{item.averageStarRating}</Text>
                          </View>
                          <View style={styles.locationGroup}>
                            <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
                            <Text style={styles.locationTitle}>{item.distance} </Text>
                          </View>
                          <Image source={require('../../media/icon/wishlist.png')} style={styles.wishlistIco} />
                        </View>
                      </View>
                    </View>
                    <View style={styles.hrLine}></View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <FooterMenu active={activeButton} />
    </View>
  );
};




export default WishlistScreen;
