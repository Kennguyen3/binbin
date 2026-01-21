import { Product } from '@/models/Product';
import { Store } from '@/models/Store';
import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

type StoreItemProps = {
  item: Store;
  onPress: (shopId: number, shopName: string) => void;
};

const StoreItem = memo(({item, onPress}: StoreItemProps) => {
  const handlePress = () => {
    onPress(item.id, item.name);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.itemContainerStoresLine}>
          <Image 
            source={{uri: item.avatar}} 
            style={styles.imageStoresLine} 
            resizeMode="cover" 
          />
          <View style={styles.groupInfoStoreLine}>
            <View style={styles.groupDesTitle}>
              <View style={styles.titleStoresGroupLine}>
                <Image 
                  source={require('../../media/icon/check_title.png')} 
                  style={styles.iconTitleStores} 
                />
                <Text style={styles.titleStores} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <Text style={styles.descriptionStore} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <View style={styles.starLocaitonGroup}>
              <View style={styles.starGroup}>
                <Image 
                  source={require('../../media/icon/star.png')} 
                  style={styles.starIco} 
                />
                <Text style={styles.starTitle}>{item.averageStarRating}</Text>
              </View>
              <View style={styles.locationGroup}>
                <Image 
                  source={require('../../media/icon/location.png')} 
                  style={styles.locationIco} 
                />
                <Text style={styles.locationTitle}>{item.distance}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.hrLine} />
      </TouchableOpacity>
    </>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});


const styles = StyleSheet.create({
  itemContainerStoresLine: {
    flexDirection: 'row',
    padding: 12,
  },
  imageStoresLine: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  groupInfoStoreLine: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  groupDesTitle: {
    flex: 1,
  },
  titleStoresGroupLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconTitleStores: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  titleStores: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  descriptionStore: {
    fontSize: 13,
    color: '#666',
  },
  starLocaitonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  starIco: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  starTitle: {
    fontSize: 13,
    color: '#FFA500',
  },
  locationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIco: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  locationTitle: {
    fontSize: 13,
    color: '#666',
  },
  hrLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default StoreItem;