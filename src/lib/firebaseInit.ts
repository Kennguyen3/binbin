import { getApp } from '@react-native-firebase/app';
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

/** Trả về default FirebaseApp đã được native SDK khởi tạo */
export const getFirebaseApp = getApp;
