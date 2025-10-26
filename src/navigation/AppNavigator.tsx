// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../views/Login/LoginScreen';
import VerifyScreen from '../views/Login/VerifyScreen';
import VerifyLocationScreen from '../views/Location/VerifyLocationScreen';
import VerifyPhoneScreen from '../views/Login/VerifyPhoneScreen';
import ProductListScreen from '../views/ProductList/ProductListScreen';
import HomeScreen from '../views/HomePage/HomeScreen';
import ShopDetailScreen from '../views/ShopDetailScreen/ShopDetailScreen';
import { AuthProvider } from '../context/AuthContext';
import ShippingScreen from '../views/Shipping/ShippingScreen';
import OrderDetailScreen from '../views/OrderDetailScreen/OrderDetailScreen';
import WishlistScreen from '../views/Wishlist/WishlistScreen';
import NotifyScreen from '../views/Notify/NotifyScreen';
import ConfirmOrderScreen from '../views/ConfirmOrder/ConfirmOrderScreen';
import WaittingOrderScreen from '../views/ConfirmOrder/WaittingOrderScreen';
import RegisterPage from '../views/Login/RegisterPage';
import ProfilePage from '../views/Profile/ProfilePage';
import FilterPage from '../views/FilterPage/FilterPage';
import UpdatePassword from '../views/Profile/UpdatePassword';
import UpdateFullName from '../views/Profile/UpdateFullName';
import SupportCenter from '../views/Profile/SupportCenter';
import Conditions from '../views/Profile/Conditions';
import Refund from '../views/Profile/Refund';
import { SafeAreaView } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Verify: undefined;
  ProductList: undefined;
  HomePage: undefined;
  ShopDetail: undefined;
  VerifyPhone: undefined;
  VerifyLocation: undefined;
  Shipping: undefined;
  OrderDetail: undefined;
  Wishlist: undefined;
  Notify: undefined;
  ConfirmOrder: undefined;
  WaittingOrder: undefined;
  RegisterPage: undefined;
  ProfilePage: undefined;
  UpdatePassword: undefined;
  UpdateFullName: undefined;
  SupportCenter: undefined;
  Conditions: undefined;
  Refund: undefined;
  FilterPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen name="UpdateFullName" component={UpdateFullName} />
            <Stack.Screen name="Conditions" component={Conditions} />
            <Stack.Screen name="Refund" component={Refund} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="SupportCenter" component={SupportCenter} />
            <Stack.Screen name="WaittingOrder" component={WaittingOrderScreen} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="FilterPage" component={FilterPage} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            <Stack.Screen name="Verify" component={VerifyScreen} />
            <Stack.Screen name="Shipping" component={ShippingScreen} />
            <Stack.Screen name="VerifyLocation" component={VerifyLocationScreen} />
            <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
            <Stack.Screen name="ProductList" component={ProductListScreen} />
            <Stack.Screen name="HomePage" component={HomeScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="Notify" component={NotifyScreen} />
            <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: 'Shop Detail' }} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Detail' }} />
            <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default AppNavigator;
