import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { formatToVND } from '@/utils/currencyUtils';

interface CartFooterProps {
    quantity: number;
    totalPrice: number;
    onCheckout: () => void;
}

export const CartFooter: React.FC<CartFooterProps> = ({
    quantity,
    totalPrice,
    onCheckout,
}) => {
    return (
        <View style={styles.containerFooter}>
            <View style={styles.cartPriceFooter}>
                <Image
                    source={require('../../../media/icon/cart.png')}
                    style={styles.cartFooter}
                />
                <Text style={styles.priceFooter}>
                    {quantity} Món - {formatToVND(totalPrice)}
                </Text>
            </View>
            <TouchableOpacity style={styles.checkOutFooter} onPress={onCheckout}>
                <Text style={styles.textCheckout}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};