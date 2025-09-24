import AsyncAlert from '@/components/alert/async-alert';
import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';

export const usePicturesRequest = () => {
  const handlePictures = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!granted) {
      const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (response.status !== 'granted') {
        await AsyncAlert({ message: '설정 > 앱에서 사진 권한을 허용해 주세요.' });
        Linking.openSettings();
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled || !result.assets?.length) return;
    const { fileName, mimeType, uri } = result.assets[0];

    return {
      fileName,
      mimeType,
      uri,
    };
  };
  return {
    handlePictures,
  };
};
