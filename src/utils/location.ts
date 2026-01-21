import Geolocation from '@react-native-community/geolocation';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export type AppLocationModel = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export const checkLocationPermission = async (): Promise<boolean> => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await check(permission);

  switch (result) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED:
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    case RESULTS.BLOCKED:
      // Hướng dẫn user vào Settings
      console.log('Permission blocked, open settings');
      await openSettings();
      return false;
    default:
      return false;
  }
};
export const getLocation = async (): Promise<AppLocationModel> => {
  const hasPermission = await checkLocationPermission();

  if (!hasPermission) {
    throw new Error('Location permission not granted');
  }

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Location timeout'));
    }, 20000); // Backup timeout

    Geolocation.getCurrentPosition(
      position => {
        clearTimeout(timeoutId);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        clearTimeout(timeoutId);
        console.error('Geolocation error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: false, // Đổi thành false để nhanh hơn
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};