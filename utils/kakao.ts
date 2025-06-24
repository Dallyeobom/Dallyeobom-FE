import { initializeKakaoSDK } from '@react-native-kakao/core';

export const kakaoInitFunc = async () => {
  return await initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '', {
    web: {
      javascriptKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY ?? '',
      restApiKey: process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY ?? '',
    },
  });
};
