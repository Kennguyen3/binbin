import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';
import { formatToVND } from '@/utils/currencyUtils';

interface ProductModalProps {
  visible: boolean;
  product: any;
  quantity: number;
  note: string;
  onClose: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onNoteChange: (text: string) => void;
  onAddToCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  product,
  quantity,
  note,
  onClose,
  onIncrease,
  onDecrease,
  onNoteChange,
  onAddToCart,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.containerModal}>
      <View style={styles.bannerProduct}>
        <Image
          source={{ uri: product?.image_files }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.groupCloseImg} onPress={onClose}>
          <Image
            source={require('../../../media/icon/close_modal.png')}
            style={styles.closeImg}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.sold}>{product?.quantity_sold} đã bán</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatToVND(product?.price || 0)}</Text>

          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={onDecrease} style={styles.btnPlus}>
              <Icon name="minus-a" size={14} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrease} style={styles.btnPlus}>
              <Icon name="plus-a" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Ghi chú cho quán</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú"
          value={note}
          onChangeText={onNoteChange}
          multiline
          numberOfLines={4}
        />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng cộng ({quantity})</Text>
          <Text style={styles.totalPrice}>
            {formatToVND(quantity * (product?.price || 0))}
          </Text>
        </View>

        <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};