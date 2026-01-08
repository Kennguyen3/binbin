import Config from "react-native-config";
import { Dimensions, Linking } from "react-native";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { IMessage } from "react-native-gifted-chat";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBadgeCount } from "react-native-notification-badge";


export enum DriverApproveStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  UN_LICENSED = "unlicensed",
}

export const LATITUDE_DELTA = 0.09;
export const LONGITUDE_DELTA = 0.09;

export const PRIVACY_POLICY_LINK = Config.PRIVACY_POLICY_LINK;

export const API_URL = Config.API_URL;

export const CloudFrontUrl = Config.CLOUDFRONT_URL;

export const GooglePlaceApiKey = Config.GOOGLE_PLACE_API_KEY;

export const stripePublicKey = Config.STRIPE_PUBLIC_KEY;

export const appleMerchantId = Config.APPLE_MERCHANT_ID;

export const revenueCatApiKey = Config.REVENUE_CAT_API_KEY;
export const revenueCatEntitlementId = "Pro";

export const supportEmail = Config.SUPPORT_EMAIL;

export const useGetLandscape = () => {
  const { height: safeAreaHeight, width: safeAreaWidth } = useSafeAreaFrame();
  return safeAreaWidth > safeAreaHeight;
};

export const TRAILBALZER_SYNC_DAY_LIMIT = 30;

export const SEARCH_TIMEOUT = 1000; // 1 second

export const saveBadge = async (badge: number) => {
  setBadgeCount(badge);
  try {
    await AsyncStorage.setItem("notification_badge", badge.toString());
  } catch (e) {
    // handle error
  }
};

// Lấy badge
export const getBadge = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem("notification_badge");
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    // handle error
    return 0;
  }
};

export const ToastTypes = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error"
};

export const colors = {
  grey: '#EDEDED',
  grey2: '#41526D',
  grey3: '#767676',
  grey4: '#4B4B4B',
  grey5: '#8E8E8E',
  grey6: '#AFAFAF',
  green: '#E5F1EA',
  green2: '#26A059',
  primaryBlack: '#041B3E',
  backgroundColor: '#FAFAFA',
  primaryBlue: '#00E',
  blue2: '#051b3e',
  blue3: '#0000EE',
  textColor: '#8F969F',
  textColor2: '#4D4D4D',
  white: '#ffffff',
  black: '#000000',
  black01: '#00000019',
  red: '#ff0000',
  red2: '#CA1212',
  red3: '#F6E7E7',
  yellow: '#FFFF00',
  gold: '#EC801F',
  orange: '#EC801F',
  transparent: 'transparent',
  greyBorder: '#E6E6E6',
  greyBorderSecondary: '#D7D4D4',
  primaryGreen: '#26A059',
  strokeColor: '#DADADA',
  primaryYellow: '#F0C73A',
  charcoal: '#090909',
  lightBlue: '#008AEE',
};

export type Gender = 'male' | 'female' | 'other';
export const genderOptions: { label: string; value: Gender }[] = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];