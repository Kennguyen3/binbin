
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from './stylesNotify';
import { useAuth } from '../../context/AuthContext';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import { Store } from '../../models/Store';
import LoadingOverlay from '../../components/LoadingOverlay';
import { LIST_FAVORITE } from '../../constants/API';
import { useFocusEffect } from '@react-navigation/native';
import LoginScreen from '../Login/LoginScreen';

const NotifyScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('Notify');
  const [loadding, setLoadding] = useState(false);
  const [products, setProducts] = useState<Store[]>([]);
  const { user } = useAuth();

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
