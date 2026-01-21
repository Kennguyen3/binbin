

import { useStoreSearch } from '@/hooks/useStoreSearch';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StoreItem from './StoreItem';
import SearchComponent from '@/components/SearchComponent';
import { Store } from '@/models/Store';
import { SkeletonHeader } from '@/components/SkeletonHeader';
import { colors } from '@/constants/constants';
// import { useAuth } from '../context/AuthContext';
// import { useStoreSearch } from '../hooks/useStoreSearch';
// import SearchComponent from '../components/SearchComponent';
// import StoreItem from '../components/StoreItem';
// import LoadingOverlay from '../components/LoadingOverlay';

const FilterPage = ({ route, navigation }) => {
  const { typeId, keySearch, name } = route.params;
  const { stores, loading, searchStores } = useStoreSearch();
  const [typeKey, setTypeKey] = useState('');

  // Hide header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Get type label
  const getTypeKey = useCallback((type: number, groupName?: string) => {
    switch (type) {
      case 1: return 'Tìm Kiếm';
      case 2: return 'Deal Hot';
      case 3: return 'Mới Mở';
      case 4: return 'Gần Đây';
      case 5: return groupName || '';
      default: return '';
    }
  }, []);

  // Build search params
  const buildSearchParams = useCallback((type: number, keyword: string) => {
    if (type === 5) {
      return {
        group_shop_id: keyword,
        type: type,
      };
    }
    return {
      name: keyword,
      type: type,
    };
  }, []);

  // Initial search on mount
  useEffect(() => {
    const label = getTypeKey(typeId, name);
    setTypeKey(label);

    const params = buildSearchParams(typeId, keySearch);
    searchStores(params);
  }, [typeId, keySearch, name, getTypeKey, buildSearchParams, searchStores]);

  // Handle search callback
  const handleSearch = useCallback((keyword: string) => {
    const params = buildSearchParams(typeId, keyword);
    searchStores(params);
  }, [typeId, buildSearchParams, searchStores]);

  // Handle back
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle shop press
  const handleShopPress = useCallback((shopId: number, shopName: string) => {
    navigation.navigate('ShopDetail', {
      shopId: String(shopId),
      shopName,
    });
  }, [navigation]);

  // Render item
  const renderItem = useCallback(({ item }: { item: Store }) => {
    return <StoreItem item={item} onPress={handleShopPress} />;
  }, [handleShopPress]);

  // Key extractor
  const keyExtractor = useCallback((item: Store) => item.id.toString(), []);

  // List Header Component
  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        {typeId === 5 && (
          <View style={styles.searchData}>
            <TouchableOpacity style={styles.backHeader} onPress={handleGoBack}>
              <Image
                source={require('../../media/icon/back.png')}
                style={styles.backHeaderIMG}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* {stores.length > 0 && <View style={styles.hrLine} />} */}

        {stores.length > 0 && (
          <View style={styles.titleGroup}>
            <Text style={styles.titleLeft}>
              {typeId === 5 ? typeKey : `Danh Sách Quán ${typeKey}`}
            </Text>
          </View>
        )}
      </>
    );
  }, [typeId, keySearch, handleSearch, handleGoBack, stores.length, typeKey]);

  // List Empty Component
  const ListEmptyComponent = useMemo(() => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không Có Quán {typeKey}</Text>
      </View>
    );
  }, [loading, typeKey]);

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity style={styles.backHeader} onPress={handleGoBack}>
          <Image
            source={require('../../media/icon/back.png')}
            style={styles.backHeaderIMG}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingRight: 10, paddingLeft: 16, justifyContent: 'center' }}>
          <SearchComponent
            onSearch={handleSearch}
          />
        </View>
      </View>
      {
        loading ? (
          <SkeletonHeader />
        ) : (
          <FlatList
            data={stores}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={10}
          />
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 10,

    flexGrow: 1,
  },
  searchData: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  backHeader: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    height: 40,
    padding: 10,
  },
  backHeaderIMG: {
    width: 24,
    height: 24,
  },
  hrLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  titleGroup: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleLeft: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default FilterPage;



// // src/views/ProductList/ProductListScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
// import { getStores } from '../../services/HomeService';
// import { useAuth } from '../../context/AuthContext';
// import { Home } from '../../models/Home';
// import { Store } from '../../models/Store';
// import { styles } from './stylesFilter';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../navigation/AppNavigator';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FooterMenu from '../../components/FooterMenu';
// import { PRODUCT_ENDPOINT, PRODUCT_SEARCH } from '../../constants/API';
// import LoadingOverlay from '../../components/LoadingOverlay';
// type FilterPageNavigationProp = NavigationProp<RootStackParamList, 'FilterPage'>;
// // interface FilterPageProps {
// //   route: {
// //     params: {
// //       typeId: number;
// //       keySearch: string;
// //       name: string;
// //     };
// //   };
// // }
// const FilterPage = ({ route, navigation }) => {
//   const { typeId, keySearch, name } = route.params;
//   const { login, user, logout } = useAuth();
//   const [loadding, setLoadding] = useState(false);
//   const [activeButton, setActiveButton] = useState('home');
//   // const navigation = useNavigation<FilterPageNavigationProp>();

//   const [keySearchI, setKeySearchI] = useState(keySearch);
//   const [typeKey, setTypeKey] = useState('');

//   const images = [
//     require('../../media/slider.png'),
//     require('../../media/slider-2.png'),
//   ];
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: false, // Ẩn thanh navbar
//     });
//   }, [navigation]);

//   const [stores, setStores] = useState<Store[]>();
//   // const { cart, addToCart } = useAuth();

//   const handleShopPress = (shopId: number, shopName: string) => {
//     navigation.navigate('ShopDetail', { shopId: String(shopId), shopName });
//   };
//   const handleGoBack = () => {
//     navigation.goBack();
//   };
//   const handleFilter = () => {
//     setLoadding(true);

//     fetch(PRODUCT_SEARCH, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${user?.access_token}`,
//       },
//       body: JSON.stringify({
//         "name": keySearchI,
//         "type": typeId
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         setLoadding(false);
//         setStores(data.result.data);
//       })
//       .catch(error => {
//         setLoadding(false);
//       });
//   };
//   useEffect(() => {
//     let bodyData = {};

//     if (typeId == 1) {
//       setTypeKey('Tìm Kiếm');
//       bodyData = {
//         "name": keySearchI,
//         "type": typeId
//       };
//     } else if (typeId == 2) {
//       setTypeKey('Deal Hot');
//       bodyData = {
//         "name": keySearchI,
//         "type": typeId
//       };
//     } else if (typeId == 3) {
//       setTypeKey('Mới Mở');
//       bodyData = {
//         "name": keySearchI,
//         "type": typeId
//       };
//     } else if (typeId == 4) {
//       setTypeKey('Gần Đây');
//       bodyData = {
//         "name": keySearchI,
//         "type": typeId
//       };
//     } else if (typeId == 5) {
//       setTypeKey(name);
//       bodyData = {
//         "group_shop_id": keySearchI,
//         "type": typeId
//       };
//     }

//     setLoadding(true);

//     fetch(PRODUCT_SEARCH, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         // Authorization: `Bearer ${user?.access_token}`,
//       },
//       body: JSON.stringify(bodyData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         setLoadding(false);
//         setStores(data.result.data);
//       })
//       .catch(error => {
//         setLoadding(false);
//       });


//   }, []);

//   return (
//     <View style={styles.container}>
//       {loadding ?
//         <LoadingOverlay />
//         :
//         null
//       }
//       <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.contentContainer}>
//         <View style={styles.content_cuahang}>
//           <View style={styles.searchData}>

//             <TouchableOpacity style={styles.backHeader} onPress={() => handleGoBack()}>
//               <Image source={require('../../media/icon/back.png')} style={styles.backHeaderIMG} />
//             </TouchableOpacity>
//             {typeId != 5 && (
//               <View style={styles.groupSeach}>
//                 <Icon name="search" size={16} style={styles.iconSearch} onPress={() => handleFilter()} />
//                 <TextInput
//                   placeholder="Bạn tìm kiếm gì ?"
//                   style={styles.inputSearch}
//                   placeholderTextColor="#000"
//                   value={keySearchI}
//                   onChangeText={setKeySearchI}
//                 />
//               </View>
//             )}

//           </View>

//           {stores && stores.length > 0 && (
//             <View style={styles.hrLine}></View>
//           )}
//           {typeId == 5 && stores && stores.length > 0 && (
//             <View style={styles.titleGroup}>
//               <Text style={styles.titleLeft}>{typeKey}</Text>
//             </View>
//           )}
//           {typeId != 5 && stores && stores.length > 0 && (
//             <View style={styles.titleGroup}>
//               <Text style={styles.titleLeft}>Danh Sách Quán {typeKey}</Text>
//             </View>
//           )}
//           {!stores || stores.length == 0 && (
//             <View style={styles.titleGroup}>
//               <Text style={styles.titleLeft}>Không Có Quán {typeKey}</Text>
//             </View>
//           )}
//           {stores && stores.length > 0 && (
//             <View style={[styles.listStores, styles.mgT10]}>
//               <FlatList
//                 data={stores}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => handleShopPress(item.id, item.name)}>
//                     <View style={styles.itemContainerStoresLine}>
//                       <Image source={{ uri: item.avatar }} style={styles.imageStoresLine} resizeMode="cover" />
//                       <View style={styles.groupInfoStoreLine} >
//                         <View style={styles.groupDesTitle}>
//                           <View style={styles.titleStoresGroupLine}>
//                             <Image source={require('../../media/icon/check_title.png')} style={styles.iconTitleStores} />
//                             <Text style={styles.titleStores}>{item.name}</Text>
//                           </View>
//                           <Text style={styles.descriptionStore}>{item.description}</Text>
//                         </View>
//                         <View style={styles.starLocaitonGroup}>
//                           <View style={styles.starGroup}>
//                             <Image source={require('../../media/icon/star.png')} style={styles.starIco} />
//                             <Text style={styles.starTitle}>{item.averageStarRating}</Text>
//                           </View>
//                           <View style={styles.locationGroup}>
//                             <Image source={require('../../media/icon/location.png')} style={styles.locationIco} />
//                             <Text style={styles.locationTitle}>{item.distance} </Text>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View style={styles.hrLine}></View>
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={item => item.id.toString()}
//               />
//             </View>
//           )}
//         </View>
//       </ScrollView>
//       <View>
//         <FooterMenu active={activeButton} />
//       </View>
//     </View>
//   );
// };

// export default FilterPage;
