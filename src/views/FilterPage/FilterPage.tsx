// src/views/ProductList/ProductListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { getStores } from '../../services/HomeService';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../../models/Home';
import { Store } from '../../models/Store';
import { styles } from './stylesFilter';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Fontisto';
import FooterMenu from '../../components/FooterMenu';
import { PRODUCT_ENDPOINT, PRODUCT_SEARCH } from '../../constants/API';
import LoadingOverlay from '../../components/LoadingOverlay';
type FilterPageNavigationProp = NavigationProp<RootStackParamList, 'FilterPage'>;
interface FilterPageProps {
  route: {
    params: {
      typeId: number;
      keySearch: string;
      name: string;
    };
  };
}
const FilterPage: React.FC<FilterPageProps> = ({ route }) => {
  const { typeId, keySearch, name} = route.params;
  const { setLoginInfo, login, user, logout } = useAuth();
  const [loadding, setLoadding] = useState(false);
  const [activeButton, setActiveButton] = useState('home');
  const navigation = useNavigation<FilterPageNavigationProp>();

  const [keySearchI, setKeySearchI] = useState(keySearch);
  const [typeKey, setTypeKey] = useState('');

  const images = [
    require('../../media/slider.png'),
    require('../../media/slider-2.png'),
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const [stores, setStores] = useState<Store[]>();
  // const { cart, addToCart } = useAuth();

  const handleShopPress = (shopId: number, shopName: string) => {
    navigation.navigate('ShopDetail', { shopId: String(shopId), shopName });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleFilter = () => {
    setLoadding(true);

    fetch(PRODUCT_SEARCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        // Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "name": keySearchI,
        "type": typeId
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        setStores(data.result.data);
      })
      .catch(error => {
        setLoadding(false);
      });
  };
  useEffect(() => {
    let bodyData = {};

    if (typeId == 1) {
      setTypeKey('Tìm Kiếm');
      bodyData = {
        "name": keySearchI,
        "type": typeId
      };
    } else if (typeId == 2) {
      setTypeKey('Deal Hot');
      bodyData = {
        "name": keySearchI,
        "type": typeId
      };
    } else if (typeId == 3) {
      setTypeKey('Mới Mở');
      bodyData = {
        "name": keySearchI,
        "type": typeId
      };
    } else if (typeId == 4) {
      setTypeKey('Gần Đây');
      bodyData = {
        "name": keySearchI,
        "type": typeId
      };
    } else if (typeId == 5) {
      setTypeKey(name);
      bodyData = {
        "group_shop_id": keySearchI,
        "type": typeId
      };
    }

    setLoadding(true);

    fetch(PRODUCT_SEARCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        // Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        setStores(data.result.data);
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
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content_cuahang}>
          <View style={styles.searchData}>

            <TouchableOpacity style={styles.backHeader} onPress={() => handleGoBack()}>
              <Image source={require('../../media/icon/back.png')} style={styles.backHeaderIMG} />
            </TouchableOpacity>
            {typeId != 5 && (
            <View style={styles.groupSeach}>
              <Icon name="search" size={16} style={styles.iconSearch} onPress={() => handleFilter()} />
              <TextInput
                placeholder="Bạn tìm kiếm gì ?"
                style={styles.inputSearch}
                placeholderTextColor="#000"
                value={keySearchI}
                onChangeText={setKeySearchI}
              />
            </View>
            )}
            
          </View>

          {stores && stores.length > 0 && (
            <View style={styles.hrLine}></View>
          )}
          {typeId == 5 && stores && stores.length > 0 && (
            <View style={styles.titleGroup}>
              <Text style={styles.titleLeft}>{typeKey}</Text>
            </View>
          )}
          {typeId != 5 && stores && stores.length > 0 && (
            <View style={styles.titleGroup}>
              <Text style={styles.titleLeft}>Danh Sách Quán {typeKey}</Text>
            </View>
          )}
          {!stores || stores.length == 0 && (
            <View style={styles.titleGroup}>
              <Text style={styles.titleLeft}>Không Có Quán {typeKey}</Text>
            </View>
          )}
          {stores && stores.length > 0 && (
            <View style={[styles.listStores, styles.mgT10]}>
              <FlatList
                data={stores}
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
          )}
        </View>
      </ScrollView>
      <View>
        <FooterMenu active={activeButton} />
      </View>
    </View>
  );
};

export default FilterPage;
