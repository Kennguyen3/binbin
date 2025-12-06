
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, ScrollView, Alert, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'SupportCenter'>;

const SupportCenter = () => {
  const [activeButton, setActiveButton] = useState('profile');
  const [loadding, setLoadding] = useState(false);
  const navigation = useNavigation<ProfilePageNavigationProp>();

  const { setLoginInfo, login, user, logout, updateActiveFullName } = useAuth();

  const handleGoBack = () => {
    navigation.goBack();
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const getInitials = (fullName) => {
    if (!fullName) return '';

    const words = fullName.trim().split(' ');
    const initials = words
      .slice(0, 2) // lấy 2 từ đầu tiên
      .map(word => word.charAt(0).toUpperCase())
      .join('');

    return initials;
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:binbin@gmail.com');
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
          <Text style={[styles.titleHeaderGroup]}>Trung tâm trợ giúp</Text>
          <Text style={styles.sectionTitle}>📩 Liên hệ hỗ trợ</Text>
          <Text style={styles.text}>
            Nếu bạn cần hỗ trợ, có thắc mắc hoặc muốn yêu cầu xử lý thông tin cá nhân, vui lòng liên hệ chúng tôi qua email:
          </Text>
          <TouchableOpacity onPress={handleEmailPress} style={styles.emailContainer}>
            <Icon name="envelope" size={16} color="#2079FF" />
            <Text style={styles.emailText}> binbin@gmail.com</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>🔐 Quyền của bạn</Text>
          <Text style={styles.text}>
            Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân bất kỳ lúc nào.
          </Text>

          <Text style={styles.sectionTitle}>📍 Kiểm soát vị trí</Text>
          <Text style={styles.text}>
            Để quản lý quyền truy cập vị trí, bạn có thể:
          </Text>
          <Text style={styles.bullet}>• Tắt quyền vị trí trong cài đặt ứng dụng.</Text>
          <Text style={styles.bullet}>• Gửi yêu cầu xóa dữ liệu vị trí qua email hỗ trợ.</Text>

          <Text style={styles.footer}>Cảm ơn bạn đã đồng hành cùng BinBin!</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Icon name="arrow-left" size={16} color="#fff" />
              <Text style={styles.buttonText}> Quay lại</Text>
            </TouchableOpacity>
          </View>

        </View>


      </ScrollView>
      <FooterMenu active={activeButton} />
    </View>
  );
};




export default SupportCenter;
