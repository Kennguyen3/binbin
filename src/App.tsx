import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Platform, Linking } from 'react-native';
import firebase from '@react-native-firebase/app';
import AppNavigator from './navigation/AppNavigator';
import FlashMessage from "react-native-flash-message";
import NetInfo from '@react-native-community/netinfo';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const firebaseConfig = {
  clientId: "1008270887751-puojj51hu0557hk7lat4f7dr3n7a633p.apps.googleusercontent.com",
  apiKey: "AIzaSyCv-RD7btWNVvRgK4lde9oCp2u1Q2-pnt0",
  projectId: "binbina-c1ac9",
  storageBucket: "binbina-c1ac9.appspot.com",
  messagingSenderId: "1008270887751",
  appId: "1:1008270887751:ios:840e6cb9911a6b90381a62",
  databaseURL: "https://binbina-c1ac9-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Hàm kiểm tra quyền vị trí
const requestLocationPermission = async () => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    const requestResult = await request(permission);
    if (requestResult !== RESULTS.GRANTED) {
      Alert.alert("Bạn cần cấp quyền vị trí để sử dụng ứng dụng.");
    }
  } else if (result === RESULTS.BLOCKED) {
    Alert.alert(
      "Quyền vị trí bị chặn",
      "Vui lòng vào Cài đặt để cấp quyền cho ứng dụng.",
      [{ text: "Mở Cài đặt", onPress: () => Linking.openSettings() }]
    );
  }
};

// checkInternet nhận vào 1 callback, chỉ khi có mạng mới gọi callback
const checkInternet = async (onConnected) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    Alert.alert(
      'Không có kết nối mạng',
      'Vui lòng bật kết nối mạng (Wi-Fi hoặc dữ liệu di động).',
      [
        {
          text: 'OK',
          onPress: () => {
            // Gọi lại chính nó (đệ quy) cho đến khi có mạng
            checkInternet(onConnected);
          },
        },
      ],
      { cancelable: false }
    );
  } else {
    // Khi đã có mạng, ta gọi callback
    onConnected();
  }
};

const App = () => {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1) Kiểm tra internet trước
    checkInternet(async () => {
      // 2) Khi đã có internet, ta xin quyền vị trí
      await requestLocationPermission();

      // 3) Khởi tạo Firebase nếu chưa
      if (!firebase.apps.length) {
        console.log('Initializing Firebase...');
        firebase
          .initializeApp(firebaseConfig)
          .then(() => {
            console.log('Firebase initialized successfully');
            setIsFirebaseInitialized(true);
          })
          .catch(error => {
            console.log('Firebase initialization error:', error);
          });
      } else {
        console.log('Firebase already initialized');
        setIsFirebaseInitialized(true);
      }
    });
  }, []);

  // Khi Firebase chưa khởi tạo xong, ta có thể return 1 màn hình chờ
  useEffect(() => {
    if (isFirebaseInitialized) {
      // Nếu muốn làm thêm việc gì trước khi vào App, có thể làm ở đây
      setIsReady(true);
    }
  }, [isFirebaseInitialized]);

  // Nếu chưa sẵn sàng, ta hiển thị màn hình chờ (splash, loading, v.v.)
  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Đang kiểm tra kết nối & khởi tạo...</Text>
      </View>
    );
  }

  // Chỉ khi đã có mạng, xin quyền, Firebase sẵn sàng -> Hiển thị AppNavigator
  return (
    <>
      <AppNavigator />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
