// src/views/Login/LoginScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesVerifyPhone';
import { useAuth } from '../../context/AuthContext';
import { UPDATE_PROFILE } from '../../constants/API';
import LoadingOverlay from '../../components/LoadingOverlay';
type VerifyPhoneScreenNavigationProp = NavigationProp<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen = () => {

  const navigation = useNavigation<VerifyPhoneScreenNavigationProp>();
  const { setLoginInfo, login, user, logout, updatePhoneNumber } = useAuth();
  const [loadding, setLoadding] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Biểu thức chính quy cho số điện thoại Việt Nam, ví dụ: 0123-456-7890 hoặc 0123456789
    const regex = /^(0[1-9][0-9]{8})$/;
    return regex.test(phoneNumber);
  };
  const handleLogin = () => {
    setLoadding(true);
    if (!isValidPhoneNumber(phoneNumber)) {
      setLoadding(false);
      Alert.alert('Số điện thoại không đúng định dạng.');
      return;
    }
    fetch(UPDATE_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "phone_number": phoneNumber,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        updatePhoneNumber(phoneNumber);
        // navigation.navigate('Verify');
        navigation.navigate('VerifyLocation');
        return;
      })
      .catch(error => {
        setLoadding(false);
        Alert.alert(error);
      });

  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }
      <View style={styles.header_navbar}>
        <TouchableOpacity style={styles.backHeader} onPress={() => handleGoBack()}>
          <Image source={require('../../media/icon/back_screen.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.welcome}>Xác minh số điện thoại</Text>
      </View>
      <Text style={styles.placeholder}>Nhập nhập số điện thoại để nhận OTP chúng tôi gửi đến bạn dưới đây</Text>
      <View style={styles.groupInput}>
        <Text style={styles.prefixText}>+84</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableWithoutFeedback onPress={handleLogin}>
        <Text style={styles.btnNext}>Tiếp tục</Text>
      </TouchableWithoutFeedback>

    </View>
  );
};

export default VerifyPhoneScreen;
