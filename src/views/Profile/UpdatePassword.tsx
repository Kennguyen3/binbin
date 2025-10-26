// src/views/Login/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, Alert, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesProfile';
import { useAuth } from '../../context/AuthContext';
import { UPDATE_PASSWORD_ENDPOINT } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/LoadingOverlay';
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'UpdatePassword'>;

const UpdatePassword = () => {
  const [activeButton, setActiveButton] = useState('profile');
  const [loadding, setLoadding] = useState(false);
  const navigation = useNavigation<ProfilePageNavigationProp>();

  const [activeItem, setActiveItem] = useState<number | null>(1);
  const { setLoginInfo, login, user, logout } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Vui lòng nhập đầy đủ tất cả các trường.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Mật khẩu mới không khớp.");
      return;
    }
    setLoadding(true);
    fetch(UPDATE_PASSWORD_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        "old_password" : oldPassword,
        "password" : newPassword,
        "password_confirmation" : confirmPassword
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        if (data.success) {
          Alert.alert("✅ Thành công", data.message);
          // Có thể reset form hoặc điều hướng nếu cần
        } else {
          Alert.alert("❌ Thất bại", data.message);
        }
      })
      .catch(error => {
        setLoadding(false);
      });
  };

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
      {loadding ?
        <LoadingOverlay />
        :
        null
      }

      {/* <HeaderTab showBack={false} title={"Tài Khoản " + user?.full_name} /> */}
      <View style={styles.HeaderCusomeProfile}>
        <View style={styles.HeaderGroup}>
          <View style={styles.IconName}>
            <Text style={[styles.IconText]}>{getInitials(user?.full_name)}</Text>
          </View>
          <View style={styles.GroupPhoneName}>
            <Text style={[styles.headerName]}>{user?.full_name}</Text>
            <Text style={[styles.headerPhone]}>{user?.phone_number}</Text>
          </View>
        </View>
      </View>


      <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: '100%' }}>
        <View style={styles.menuTabs}>
          <Text style={[styles.titleHeaderGroup]}>Thay đổi mật khẩu</Text>
          <Text style={styles.label}>Mật khẩu cũ</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Icon name="arrow-left" size={16} color="#fff" />
              <Text style={styles.buttonText}> Quay lại</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.changeButton} onPress={handleChange}>
              <Icon name="redo" size={16} color="#fff" />
              <Text style={styles.buttonText}> Thay đổi</Text>
            </TouchableOpacity>
          </View>

        </View>


      </ScrollView>
      <FooterMenu active={activeButton} />
    </View>
  );
};




export default UpdatePassword;
