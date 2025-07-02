import { initializeKakaoSDK } from '@react-native-kakao/core';
import Constants from 'expo-constants';
const kakaoKey = Constants.expoConfig?.extra?.kakaoNativeAppKey;

export const kakaoInitFunc = async () => {
  return await initializeKakaoSDK(kakaoKey ?? '', {});
};
