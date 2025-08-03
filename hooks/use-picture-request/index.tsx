import AsyncAlert from '@/components/alert/async-alert';
import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';
export interface PictureFile {
  uri: string;
  fileName: string;
  mimeType: string;
}
export const usePicturesRequest = () => {
  const handlePictures = async () => {
    const { canAskAgain, granted } = await ImagePicker.getMediaLibraryPermissionsAsync();

    // 1. 권한 이미 있는 경우
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

    // 2. 권한 요청 가능하면 요청
    if (canAskAgain) {
      const { granted: newGranted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newGranted) {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (result.canceled || !result.assets?.length) return;
        const { fileName, mimeType, uri } = result.assets[0];
        return {
          fileName,
          mimeType,
          uri,
        };
      }
      await AsyncAlert({ message: '사진을 선택하려면 권한이 필요합니다.' });
      return;
    }
    // 권한 요청을 할 수 없을 경우
    await AsyncAlert({ message: '설정 > 앱에서 카메라 권한을 직접 허용해주세요.' });
    Linking.openSettings();
  };
  return {
    handlePictures,
  };
};
