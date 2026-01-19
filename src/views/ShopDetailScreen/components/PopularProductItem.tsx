import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { truncateText } from '@/services/TextService';

interface PopularProductItemProps {
    item: any;
    onAddToCart: (item: any) => void;
}

export const PopularProductItem: React.FC<PopularProductItemProps> = ({
    item,
    onAddToCart,
}) => {
    return (
        <View style={styles.itemContainerStoresLine}>
            <Image
                source={{ uri: item.image_files }}
                style={styles.imageStoresLine}
                resizeMode="cover"
            />
            <View style={styles.groupInfoStoreLine}>
                <View style={styles.groupDesTitle}>
                    <Text style={styles.titleStores}>{truncateText(item.name, 20)}</Text>
                    <Text style={styles.descriptionStore}>
                        {truncateText(item.description, 70)}
                    </Text>
                    <Text style={styles.soildedStore}>{item.quantity_sold} đã bán</Text>
                    <View style={styles.groupAddtoCartPrice}>
                        <Text style={styles.priceProductList}>{item.price_format}</Text>
                        <TouchableOpacity onPress={() => onAddToCart(item)}>
                            <Image
                                source={require('../../../media/icon/plus.png')}
                                style={styles.plusCart}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};