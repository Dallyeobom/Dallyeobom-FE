import { kakaoInitFunc } from '@/utils/kakao';
import { getKeyHashAndroid } from '@react-native-kakao/core';
import { useEffect } from 'react';

export const useKaKaoInit = () => {
  useEffect(() => {
    kakaoInitFunc()
      .then((_) => {
        console.log('Kakao SDK 초기화 완료');
      })
      .then(() => {
        getKeyHashAndroid().then((_) => {
          console.log('Android Key Hash:');
        });
      });
  }, []);
};
