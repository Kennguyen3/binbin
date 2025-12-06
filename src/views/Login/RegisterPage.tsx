
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../../constants/API';
import { useLayoutEffect } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RegisterPageNavigationProp = NavigationProp<RootStackParamList, 'RegisterPage'>;



export const onFacebookSignIn = async (): Promise<any> => {

};


const RegisterPage = () => {

  const navigation = useNavigation<RegisterPageNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ẩn thanh navbar
    });
  }, [navigation]);


  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const { setLoginInfo, login, user, logout } = useAuth();
  const [loadding, setLoadding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRe, setShowPasswordRe] = useState(false);

  const onGoogleSignIn = async (): Promise<any> => {
    setLoadding(true);
    try {
      GoogleSignin.configure({
        webClientId:
          '1008270887751-u4e0ucmtddfeavvc41c443fsuigj3aim.apps.googleusercontent.com',
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const googleIdToken = userInfo.idToken;
      const googleUserId = userInfo.user.id;
      const googleEmail = userInfo.user.email;
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(googleIdToken);

      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      // const confirmation = await auth().signInWithPhoneNumber("+84961177604");
      // return;

      fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "login_type": "is_google",
          "uid": userCredential.user.uid
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == "false") {
            Alert.alert(data.message);
            return;
          }
          login(data.result);
          setLoadding(false);

          if (data.result) {
            // Nếu user đã đăng nhập, chuyển hướng đến HomeScreen
            // if (data.result.is_phone == 1) {
            //   navigation.navigate('VerifyPhone');
            // } else if (data.result.is_address == 1) {
            //   navigation.navigate('VerifyLocation');
            // } else {
            //   navigation.navigate('HomePage');
            // }
            navigation.navigate('HomePage');
          }
        })
        .catch(error => {
          setLoadding(false);
          Alert.alert(error);
        });
      // console.log('Google Sign-In successful', userCredential.user.uid);

      // Navigate to the desired screen
      // Example: navigation.navigate('ProductList');
      // navigation.navigate('ProductList');

      return googleIdToken;
    } catch (error) {
      setLoadding(false);
      console.log('error signed in user', error);
      return false;
    }
  };

  const handleRegister = async (): Promise<any> => {
    navigation.navigate('Login');
  };

  const handleLoginNew = async (): Promise<any> => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      Alert.alert("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!password || password.trim() === "") {
      Alert.alert("Vui lòng nhập mật khẩu.");
      return;
    }
    if (!repassword || repassword.trim() === "") {
      Alert.alert("Vui lòng nhập lại mật khẩu.");
      return;
    }
    if (repassword != password) {
      Alert.alert("Mật khẩu không trùng khớp.");
      return;
    }
    // if (!emailInput || emailInput.trim() === "") {
    //   Alert.alert("Vui lòng nhập Email.");
    //   return; 
    // }
    setLoadding(true);
    try {
      fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "phone_number": phoneNumber,
          "password": password,
          "user_type": 'personal',
          // "email" : emailInput,
          "password_confirmation": repassword
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error_code == 1) {
            setLoadding(false);
            Alert.alert(data.message);
            return;
          }
          if (data.success == "false") {
            setLoadding(false);
            Alert.alert(data.message);
            return;
          }
          login(data.result);
          setLoadding(false);
          try {
            AsyncStorage.setItem('userInfo', JSON.stringify(data.result));
          } catch (error) {
            console.error('Failed to save login info', error);
          }

          if (data.result) {
            navigation.navigate('VerifyLocation');
          }
        })
        .catch(error => {
          setLoadding(false);
          Alert.alert(error);
        });

    } catch (error) {
      setLoadding(false);
      console.log('error signed in user', error);
      return false;
    }
  };


  const handleLogin = () => {

    navigation.navigate('Verify');
    return;
    // Gọi API đăng nhập và lưu thông tin đăng nhập
    fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    })
      .then(response => response.json())
      .then(data => {
        // Lưu thông tin đăng nhập vào context
        setLoginInfo(data);
        navigation.navigate('ProductList');
      })
      .catch(error => {
        console.log(error);
        console.error('Error logging in', error);
      });
  };
  const handleLoginSocial = () => {

    navigation.navigate('VerifyPhone');
    return;
    // Gọi API đăng nhập và lưu thông tin đăng nhập
    fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    })
      .then(response => response.json())
      .then(data => {
        // Lưu thông tin đăng nhập vào context
        setLoginInfo(data);
        navigation.navigate('ProductList');
      })
      .catch(error => {
        console.log(error);
        console.error('Error logging in', error);
      });
  };
  return (
    <View style={styles.container}>
      {loadding ?
        <LoadingOverlay />
        :
        null
      }

      <Image source={require('../../media/logoLogin.png')} style={styles.logo} />
      <Text style={styles.welcome}>Đăng Ký</Text>
      <Text style={styles.placeholder}>Nhập số điện thoại của bạn</Text>
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
      <View style={styles.groupInput}>
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye" : "locked"}
            size={14}
            color="#888"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}// Ẩn ký tự nhập vào
          autoCapitalize="none"  // Không viết hoa chữ cái đầu tiên
        />
      </View>
      <View style={styles.groupInput}>
        <TouchableOpacity
          onPress={() => setShowPasswordRe(!showPasswordRe)}>
          <Icon
            name={showPasswordRe ? "eye" : "locked"}
            size={14}
            color="#888"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          value={repassword}
          onChangeText={setRepassword}
          secureTextEntry={!showPasswordRe}
          autoCapitalize="none"
        />
      </View>
      {/* <View style={styles.groupInput}>

        <Icon
          name={"email"}
          size={14}
          color="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập Email"
          value={emailInput}
          onChangeText={setEmailInput}
        />
      </View> */}
      <TouchableWithoutFeedback onPress={handleLoginNew}>
        <Text style={styles.btnNext}>Đăng ký</Text>
      </TouchableWithoutFeedback>
      <View style={styles.register_group}>
        <Text style={styles.register_text}>Nếu đã có tài khoản ?
          <TouchableWithoutFeedback onPress={handleRegister}>
            <Text style={styles.register_link} > Đăng Nhập</Text>
          </TouchableWithoutFeedback>
        </Text>

      </View>
      <View style={styles.divider}>
        <Text style={styles.divi_text}>Hoặc</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={onGoogleSignIn}>
        <Image
          source={require('../../media/ico_lg_google.png')}
          style={styles.iconLogin}
        />
        <Text style={styles.buttonTextLogin}>Đăng ký bằng Google</Text>
      </TouchableOpacity>

    </View>
  );
};

export default RegisterPage;
