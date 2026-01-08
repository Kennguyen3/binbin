import { Platform, PermissionsAndroid } from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      // iOS xin permission trong Info.plist
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cho phép truy cập vị trí',
        message: 'Ứng dụng cần vị trí của bạn để hiển thị cửa hàng gần nhất',
        buttonPositive: 'Đồng ý',
        buttonNegative: 'Từ chối',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.warn('❌ requestLocationPermission error:', error);
    return false;
  }
};
