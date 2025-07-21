import { kakaoInitFunc } from '@/utils/kakao';
import { getKeyHashAndroid } from '@react-native-kakao/core';
import { useEffect } from 'react';

export const useKaKaoInit = () => {
  useEffect(() => {
    kakaoInitFunc()
      .then((data) => {
        console.log('Kakao SDK 초기화 완료', data);
      })
      .then(() => {
        getKeyHashAndroid().then((keyHash) => {
          console.log('Android Key Hash:', keyHash);
        });
      });
  }, []);
};
