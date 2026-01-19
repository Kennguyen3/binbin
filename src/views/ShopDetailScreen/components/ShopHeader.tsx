import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface ShopHeaderProps {
    imageUri: string;
    onGoBack: () => void;
    onShare: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
    imageUri,
    onGoBack,
    onShare,
}) => {
    return (
        <View style={styles.sliders}>
            <Image
                source={{ uri: imageUri }}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
            />
            <TouchableOpacity style={styles.backHeader} onPress={onGoBack}>
                <Image
                    source={require('../../../media/icon/back.png')}
                    style={styles.backHeaderIMG}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareHeader} onPress={onShare}>
                <Image
                    source={require('../../../media/icon/share.png')}
                    style={styles.shareHeaderIMG}
                />
            </TouchableOpacity>
        </View>
    );
};