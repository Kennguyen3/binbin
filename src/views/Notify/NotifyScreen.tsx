// src/views/Login/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesNotify';
import { useAuth } from '../../context/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import { Home } from '../../models/Home';
import { Store } from '../../models/Store';
import LoadingOverlay from '../../components/LoadingOverlay';
import { LIST_FAVORITE } from '../../constants/API';
type NotifyScreenNavigationProp = NavigationProp<RootStackParamList, 'Notify'>;

const NotifyScreen = () => {
  const [activeButton, setActiveButton] = useState('Notify');
  const [loadding, setLoadding] = useState(false);
  const [products, setProducts] = useState<Store[]>([]);
  const { user } = useAuth();
  const navigation = useNavigation<NotifyScreenNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);
  const handleShopPress = (shopId: number, shopName: string) => {
    
  };

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

  return (

    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <HeaderTab showBack={false} title="Thông báo" />
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
                            <Text style={styles.titleStores}>Đơn hàng #123456 đã hoàn tất</Text>
                          </View>
                          <Text style={styles.descriptionStore}>Đơn hàng đã được giao đến cho quý khách. Chúc quý khách ngon miệng.</Text>
                        </TouchableOpacity>
                        <View style={styles.starLocaitonGroup}>
                          <View style={styles.locationGroup}>
                            <Text style={styles.locationTitle}>13:00 - 14/06/2024</Text>
                          </View>
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




export default NotifyScreen;
