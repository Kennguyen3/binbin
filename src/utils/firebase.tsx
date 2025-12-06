import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk-next";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { PermissionsAndroid } from "react-native";
import { getFirebaseApp } from "@/lib/firebaseInit";
import { ToastTypes } from "@/constants/constants";
import { presentToastMessage } from "./functions";

const app = getFirebaseApp();

export const onGoogleSignIn = async () => {
    try {
        GoogleSignin.configure({
            webClientId:
                '874677192536-r0n2atfv164ug7nlmsaiveal39rgj3cf.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        await GoogleSignin.signOut();                   // xoá phiên cũ
        const userInfo = await GoogleSignin.signIn();
        const { idToken } = await GoogleSignin.getTokens();
        if (!idToken) return null;
        // (3) tạo credential & đăng nhập Firebase
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return await auth(app).signInWithCredential(googleCredential);
    } catch (err) {
        console.log('error signed in user', err);
        presentToastMessage({ type: ToastTypes.ERROR, text: 'Đã có lỗi xảy ra, vui lòng thử lại sau.' });
        return null;
    }
};
