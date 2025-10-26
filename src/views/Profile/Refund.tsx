// src/views/Login/LoginScreen.tsx
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
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'Refund'>;

const Refund = () => {
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
          <Text style={[styles.titleHeaderGroup]}>Chính sách Hoàn tiền</Text>
          <Text style={styles.refundSectionTitle}>1. Mục đích</Text>
          <Text style={styles.refundParagraph}>
            Chính sách Hoàn tiền nhằm bảo vệ quyền lợi của người dùng trong quá trình sử dụng ứng dụng BinBin, đồng thời đảm bảo tính minh bạch và công bằng trong các giao dịch phát sinh lỗi.
          </Text>

          <Text style={styles.refundSectionTitle}>2. Trường hợp được hoàn tiền</Text>
          <Text style={styles.refundBullet}>• Đơn hàng bị hủy bởi nhà hàng hoặc tài xế giao hàng.</Text>
          <Text style={styles.refundBullet}>• Giao sai món, thiếu món hoặc món không đạt chất lượng nghiêm trọng.</Text>
          <Text style={styles.refundBullet}>• Thanh toán thành công nhưng đơn hàng không được tạo.</Text>

          <Text style={styles.refundSectionTitle}>3. Trường hợp không hoàn tiền</Text>
          <Text style={styles.refundBullet}>• Người dùng đổi ý sau khi đã đặt hàng.</Text>
          <Text style={styles.refundBullet}>• Đơn hàng được giao đúng như yêu cầu.</Text>
          <Text style={styles.refundBullet}>• Không có đủ bằng chứng xác minh sự cố.</Text>

          <Text style={styles.refundSectionTitle}>4. Quy trình hoàn tiền</Text>
          <Text style={styles.refundParagraph}>
            Vui lòng liên hệ với chúng tôi qua email <Text style={styles.refundEmail}>binbin@gmail.com</Text> trong vòng 24 giờ kể từ khi đơn hàng xảy ra sự cố. Cung cấp mã đơn hàng và mô tả chi tiết kèm hình ảnh nếu có. Chúng tôi sẽ phản hồi trong vòng 1–2 ngày làm việc.
          </Text>

          <Text style={styles.refundSectionTitle}>5. Phương thức hoàn tiền</Text>
          <Text style={styles.refundBullet}>• Đối với thanh toán online: hoàn tiền về phương thức thanh toán ban đầu.</Text>
          <Text style={styles.refundBullet}>• Đối với thanh toán tiền mặt: hỗ trợ bằng mã giảm giá hoặc chuyển khoản.</Text>

          <Text style={styles.refundFooter}>
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của BinBin!
          </Text>
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




export default Refund;
