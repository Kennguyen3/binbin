
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesProfile';
import { useAuth } from '../../context/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'ProfilePage'>;

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState('profile');
  const navigation = useNavigation<ProfilePageNavigationProp>();

  const [activeItem, setActiveItem] = useState<number | null>(1);
  const { setLoginInfo, login, user, logout } = useAuth();
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
  return (

    <View style={styles.container}>

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
                name={"user"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đổi thông tin</Text>
            </View>
            <Icon
              name={"angle-right"}
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
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Wishlist')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"heart"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Yêu thích</Text>
            </View>
            <Icon
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Shipping')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"clipboard-list"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đơn hàng</Text>
            </View>
            <Icon
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Notify')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"bell"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Thông báo</Text>
            </View>
            <Icon
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate()} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"sign-out-alt"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Đăng xuất</Text>
            </View>
            <Icon
              name={"angle-right"}
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
                name={"envelope"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Trung tâm trợ giúp</Text>
            </View>
            <Icon
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Refund')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"exchange-alt"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Chính sách hoàn tiền</Text>
            </View>
            <Icon
              name={"angle-right"}
              size={14}
              color="#444444"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigatePage('Conditions')} style={styles.item_list}>
            <View style={styles.group_1}>
              <Icon
                name={"scroll"}
                size={14}
                color="#444444"
              />
              <Text style={[styles.btnNext]}>Điều khoản & Điều kiện</Text>
            </View>
            <Icon
              name={"angle-right"}
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
