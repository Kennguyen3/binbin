
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
type ProfilePageNavigationProp = NavigationProp<RootStackParamList, 'Conditions'>;

const Conditions = () => {
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
          <Text style={[styles.titleHeaderGroup]}>Điều khoản & Điều kiện</Text>
          <Text style={styles.termsSection}>1. Mục đích và Phạm vi</Text>
          <Text style={styles.termsText}>
            Chính sách này mô tả cách Công ty TNHH BinBin thu thập, sử dụng và tiết lộ thông tin cá nhân của bạn khi bạn sử dụng ứng dụng BinBin.
            Bằng cách sử dụng ứng dụng, bạn đồng ý với các điều khoản tại đây. Nếu không đồng ý, vui lòng không tiếp tục sử dụng ứng dụng.
          </Text>

          <Text style={styles.termsSection}>2. Thu thập thông tin</Text>
          <Text style={styles.termsBullet}>• Thông tin tài khoản: tên, số điện thoại, email, mật khẩu, ngày sinh, địa chỉ giao hàng.</Text>
          <Text style={styles.termsBullet}>• Hành vi sử dụng: lịch sử đặt món, đánh giá, món ăn yêu thích.</Text>
          <Text style={styles.termsBullet}>• Thiết bị: loại thiết bị, hệ điều hành, phiên bản app, địa chỉ IP.</Text>
          <Text style={styles.termsBullet}>• Vị trí: khi bạn cho phép, kể cả khi app chạy nền.</Text>

          <Text style={styles.termsSection}>3. Sử dụng thông tin</Text>
          <Text style={styles.termsBullet}>• Cung cấp, cải thiện dịch vụ và trải nghiệm người dùng.</Text>
          <Text style={styles.termsBullet}>• Gửi thông báo đơn hàng, khuyến mãi, sự kiện.</Text>
          <Text style={styles.termsBullet}>• Phân tích hành vi, cá nhân hóa nội dung gợi ý.</Text>
          <Text style={styles.termsBullet}>• Hỗ trợ kỹ thuật, xử lý sự cố.</Text>

          <Text style={styles.termsSection}>4. Chia sẻ thông tin</Text>
          <Text style={styles.termsBullet}>• Với nhà cung cấp dịch vụ: lưu trữ, thanh toán, giao hàng.</Text>
          <Text style={styles.termsBullet}>• Với cơ quan pháp luật khi được yêu cầu hợp pháp.</Text>

          <Text style={styles.termsSection}>5. Bảo mật thông tin</Text>
          <Text style={styles.termsText}>
            Chúng tôi áp dụng các biện pháp bảo vệ phù hợp để ngăn chặn truy cập trái phép, mất mát hoặc lạm dụng dữ liệu cá nhân.
          </Text>

          <Text style={styles.termsSection}>6. Kiểm soát dữ liệu vị trí</Text>
          <Text style={styles.termsBullet}>• Tắt quyền truy cập vị trí trong cài đặt thiết bị.</Text>
          <Text style={styles.termsBullet}>• Gửi yêu cầu xóa vị trí qua email.</Text>

          <Text style={styles.termsSection}>7. Quyền của bạn</Text>
          <Text style={styles.termsText}>
            Bạn có thể yêu cầu truy cập, chỉnh sửa, xóa hoặc dừng xử lý dữ liệu cá nhân. Gửi yêu cầu qua email bên dưới.
          </Text>

          <Text style={styles.termsSection}>8. Thay đổi chính sách</Text>
          <Text style={styles.termsText}>
            Chúng tôi có thể cập nhật nội dung này bất kỳ lúc nào và sẽ thông báo qua ứng dụng hoặc email nếu có thay đổi quan trọng.
          </Text>

          <Text style={styles.termsSection}>9. Liên hệ</Text>
          <Text style={styles.termsText}>
            Mọi thắc mắc xin gửi về email:
          </Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.termsEmail}>binbin@gmail.com</Text>
          </TouchableOpacity>

          <Text style={styles.termsFooter}>Cảm ơn bạn đã sử dụng Ứng dụng BinBin!</Text>
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




export default Conditions;
