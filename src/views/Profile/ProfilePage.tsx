
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesProfile';
import { useAuth } from '../../context/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../Login/LoginScreen';
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'ProfilePage'>;

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState('profile');
  const navigation = useNavigation<ProfilePageNavigationProp>();

  const [activeItem, setActiveItem] = useState<number | null>(1);
  const { login, user, logout } = useAuth();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);
  const handleNavigate = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Failed to clear login info', error);
    }
    navigation.navigate("Login");
  };
  const handleNavigatePage = (screen: string) => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate(screen);
  };
  const getInitials = (fullName) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');
    const initials = words
      .slice(0, 2) // lấy 2 từ đầu tiên
      .map(word => word.charAt(0).toUpperCase())
      .join('');

    return initials;
  };

  console.log('===> ProfilePage User Info:', user);

  const [visibleLoginScreen, setVisibleLoginScreen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [user])
  );

  const checkLoginStatus = async () => {
    console.log('Checking login status...: ', user);
    if (!user) {
      setVisibleLoginScreen(true);
    } else {
      setVisibleLoginScreen(false);
    }
  };

  return (

    <View style={styles.container}>
      {
        visibleLoginScreen &&
        <LoginScreen
          isVisible={visibleLoginScreen}
          onClose={() => {
            setVisibleLoginScreen(false)
            navigation.navigate('MainTabs', { screen: 'Home' });
          }}
        />
      }
      {/* <HeaderTab showBack={false} title={"Tài Khoản " + user?.full_name} /> */}
      <View style={styles.HeaderCusomeProfile}>
        <TouchableOpacity onPress={() => handleNavigatePage('UpdateFullName')} style={styles.HeaderGroup}>
          <View style={styles.IconName}>
            <Text style={[styles.IconText]}>{getInitials(user?.full_name)}</Text>
          </View>
          <View style={styles.GroupPhoneName}>
            <Text style={[styles.headerName]}>{user?.full_name}</Text>
            <Text style={[styles.headerPhone]}>{user?.phone_number}</Text>
          </View>
        </TouchableOpacity>
      </View>


      <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: '100%' }}>
        <View style={styles.menuTabs}>
          <Text style={[styles.titleHeaderGroup]}>Tài khoản của tôi</Text>
          <TouchableOpacity onPress={() => handleNavigatePage('UpdateFullName')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"person"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đổi thông tin</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('UpdatePassword')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"key"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đổi mật khẩu</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Wishlist')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"favorite"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Yêu thích</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Shipping')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"shopping-cart"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đơn hàng</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Notify')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"notifications"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Thông báo</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate()} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"logout"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đăng xuất</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>

        </View>

        <View style={styles.menuTabs}>
          <Text style={[styles.titleHeaderGroup]}>Trợ giúp</Text>
          <TouchableOpacity onPress={() => handleNavigatePage('SupportCenter')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"help-outline"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Trung tâm trợ giúp</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Refund')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"money"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Chính sách hoàn tiền</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Conditions')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"description"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Điều khoản & Điều kiện</Text>
            </View>
            <Icon
              name={"arrow-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>

        </View>

      </ScrollView>
      <FooterMenu active={activeButton} />
    </View>
  );
};




export default ProfilePage;
