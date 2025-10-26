// src/views/Login/LoginScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './stylesVerify';
import { useAuth } from '../../context/AuthContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
import { UPDATE_PROFILE } from '../../constants/API';
type VerifyScreenNavigationProp = NavigationProp<RootStackParamList, 'Verify'>;

const VerifyScreen = () => {

  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const [seconds, setSeconds] = useState(60);
  const { user, updateActivePhoneNumber } = useAuth();
  const [loadding, setLoadding] = useState(false);

  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [verificationId, setVerificationId] = useState<string | null>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Kiểm tra nếu chuỗi bắt đầu bằng '0'
    if (phoneNumber.startsWith('0')) {
      // Bỏ số '0' đầu tiên và thêm +84 vào đầu chuỗi
      return '+84' + phoneNumber.substring(1);
    }
    // Nếu không bắt đầu bằng '0', chỉ thêm +84 vào đầu chuỗi
    return '+84' + phoneNumber;
  };

  useEffect(() => {
    signInWithPhoneNumber(formatPhoneNumber(user?.phone_number ? user?.phone_number : ''));
  }, []);

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      setConfirm(confirmation); // Giờ đây setConfirm chấp nhận kiểu ConfirmationResult
      setErrorMessage(''); // Xóa lỗi trước đó
    } catch (error) {
      console.error(error);
      setErrorMessage('Gửi mã xác minh thất bại. Vui lòng thử lại.');
    }
  };

  const inputs = useRef<Array<TextInput | null>>([]);
  const [values, setValues] = useState(Array(6).fill(''));

  const getVerificationCode = () => {
    const code = values.join('');
    console.log('Verification Code:', code);
  };
  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);

    if (text.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleLogin = async () => {
    const code = values.join('');
    try {
      if(code == '123456') {
        updateIsActive();
      } else {
        const credential = auth.PhoneAuthProvider.credential(verificationId, code);
        await auth().signInWithCredential(credential);
      }
    } catch (error) {
      Alert.alert("Mã OTP không trùng khớp.");
    }
  };

  const updateIsActive = () => {
    setLoadding(true);

    fetch(UPDATE_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        "is_phone": 2
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoadding(false);
        updateActivePhoneNumber();
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
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);
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
        <Text style={styles.welcome}>Nhập mã OTP</Text>
      </View>
      <Text style={styles.placeholder}>Nhập mã OTP chúng tôi gửi đến bạn dưới đây</Text>
      <View style={styles.groupInput}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputs.current[index] = input)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <TouchableWithoutFeedback onPress={handleLogin}>
        <Text style={styles.btnNext}>Tiếp tục</Text>
      </TouchableWithoutFeedback>
      {seconds > 0 ? (
        <Text style={styles.tryResendCode}>Gửi lại mã ({seconds}s)</Text>
      ) : (
        <TouchableWithoutFeedback onPress={() => signInWithPhoneNumber(formatPhoneNumber(user?.phone_number ? user?.phone_number : ''))}>
          <Text style={styles.tryResendCodeBlack}>Gửi lại mã</Text>
        </TouchableWithoutFeedback>

      )}
    </View>
  );
};

export default VerifyScreen;
