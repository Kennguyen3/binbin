// src/views/ProductList/ProductListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getProducts } from '../../services/ProductService';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../models/Product';
import { styles } from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomePageScreenNavigationProp = NavigationProp<RootStackParamList, 'HomePage'>;

const ProductListScreen = () => {

  const navigation = useNavigation<HomePageScreenNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const [products, setProducts] = useState<Product[]>([]);
  // const { cart, addToCart } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>123</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Button title="Add to Cart"  />
          </View>
        )}
      />
    </View>
  );
};

export default ProductListScreen;
