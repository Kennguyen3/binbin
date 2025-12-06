import Config from "react-native-config";
import { Dimensions, Linking } from "react-native";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { IMessage } from "react-native-gifted-chat";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBadgeCount } from "react-native-notification-badge";


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