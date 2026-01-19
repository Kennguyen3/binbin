import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface ShopInfoProps {
    name: string;
    address: string;
    distance: string;
    rating: number;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const ShopInfo: React.FC<ShopInfoProps> = ({
    name,
    address,
    distance,
    rating,
    isFavorite,
    onToggleFavorite,
}) => {
    return (
        <View style={styles.content_cuahang}>
            <View style={styles.group_titleStore}>
                <Image
                    source={require('../../../media/icon/check_title.png')}
                    style={styles.ico_titleStore}
                />
                <Text style={styles.tt_store}>{name}</Text>
            </View>
            <Text style={styles.add_store}>{address}</Text>

            <View style={styles.rating_fatory}>
                <View style={styles.starLocaitonGroup}>
                    <View style={styles.locationGroup}>
                        <Image
                            source={require('../../../media/icon/location.png')}
                            style={styles.locationIco}
                        />
                        <Text style={styles.locationTitle}>{distance}</Text>
                    </View>
                    <View style={styles.starGroup}>
                        <Image
                            source={require('../../../media/icon/star.png')}
                            style={styles.starIco}
                        />
                        <Text style={styles.starTitle}>{rating} (100+)</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.fatoryGroup} onPress={onToggleFavorite}>
                    <Text style={styles.fatoryTitle}>Yêu thích</Text>
                    <Image
                        source={
                            isFavorite
                                ? require('../../../media/icon/wishlist.png')
                                : require('../../../media/icon/fatory_uncheck.png')
                        }
                        style={styles.factoryStore}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};