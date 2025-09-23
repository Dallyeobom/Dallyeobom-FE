import AsyncAlert from '@/components/alert/async-alert';
import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';

export const usePicturesRequest = () => {
  const handlePictures = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.canceled || !result.assets?.length) return;
      const { fileName, mimeType, uri } = result.assets[0];

      return {
        fileName,
        mimeType,
        uri,
      };
    }

    await AsyncAlert({ message: '설정 > 앱에서 카메라 권한을 직접 허용해주세요.' });
    Linking.openSettings();
  };
  return {
    handlePictures,
  };
};
