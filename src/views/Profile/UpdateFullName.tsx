// src/views/Login/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ScrollView, Alert, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesProfile';
import { useAuth } from '../../context/AuthContext';
import { UPDATE_FULLNAME_PROFILE } from '../../constants/API';
import { useLayoutEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import FooterMenu from '../../components/FooterMenu';
import HeaderTab from '../../components/HeaderTab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/LoadingOverlay';
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'UpdateFullName'>;

const UpdateFullName = () => {
  const [activeButton, setActiveButton] = useState('profile');
  const [loadding, setLoadding] = useState(false);
  const navigation = useNavigation<ProfilePageNavigationProp>();

  const [activeItem, setActiveItem] = useState<number | null>(1);
  const { setLoginInfo, login, user, logout, updateActiveFullName } = useAuth();

  const [fullNameUpdate, setFullNameUpdate] = useState<string>(user?.full_name ? user?.full_name : '');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChange = () => {
    if (!fullNameUpdate) {
      Alert.alert("Vui lòng nhập đầy đủ họ tên.");
      return;
    }
    
    setLoadding(true);
    fetch(UPDATE_FULLNAME_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "full_name": fullNameUpdate,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        updateActiveFullName(fullNameUpdate);
        Alert.alert("Đã thay đổi họ tên");
        return;
      })
      .catch(error => {
        setLoadding(false);
        Alert.alert(error);
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
          <Text style={[styles.titleHeaderGroup]}>Thay đổi thông tin</Text>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên"
            value={fullNameUpdate}
            onChangeText={setFullNameUpdate}
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




export default UpdateFullName;
