import AsyncAlert from '@/components/alert/async-alert';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { Linking } from 'react-native';

export const useCameraRequest = () => {
  const handleCamera = async () => {
    const { canAskAgain, granted } = await ImagePicker.getCameraPermissionsAsync();
    if (granted) {
      const result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      const photoUri = result.assets[0].uri;

      const { granted: mediaGranted } = await MediaLibrary.requestPermissionsAsync();
      if (mediaGranted) {
        await MediaLibrary.createAssetAsync(photoUri);
      } else {
        await AsyncAlert({ message: '사진을 앨범에 저장하려면 권한이 필요합니다.' });
      }

      return;
    }
    // 권한 요청을 할 수 있을 경우
    if (canAskAgain) {
      const { granted: newGranted } = await ImagePicker.requestCameraPermissionsAsync();
      if (newGranted) {
        const result = await ImagePicker.launchCameraAsync({
          quality: 1,
        });

        if (result.canceled || !result.assets?.length) return;

        const photoUri = result.assets[0].uri;

        const { granted: mediaGranted } = await MediaLibrary.requestPermissionsAsync();
        if (mediaGranted) {
          await MediaLibrary.createAssetAsync(photoUri);
        } else {
          await AsyncAlert({ message: '사진을 앨범에 저장하려면 권한이 필요합니다.' });
        }
        return;
      }
      await AsyncAlert({ message: '카메라를 사용하려면 권한이 필요합니다.' });
      return;
    }
    // 권한 요청을 할 수 없을 경우
    await AsyncAlert({ message: '설정 > 앱에서 카메라 권한을 직접 허용해주세요.' });
    Linking.openSettings();
  };

  return {
    handleCamera,
  };
};
