import { changeUserProfileImage, userInfo } from '@/api/user/user.service';
import { useCameraRequest } from '@/hooks/use-camera-request.tsx';
import { PictureFile, usePicturesRequest } from '@/hooks/use-picture-request';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncAlert from '../alert/async-alert';

interface ProfileImageEditCardProps {
  setIsProfileImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileImageChangeSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileImageEditCard({
  setIsProfileImageModal,
  setProfileImageChangeSaved,
}: ProfileImageEditCardProps) {
  const { handleCamera } = useCameraRequest();
  const { handlePictures } = usePicturesRequest();

  const handleUploadPictures = async () => {
    try {
      const result = await handlePictures();
      if (!result || !result.uri || !result.fileName || !result.mimeType) {
        await AsyncAlert({ message: '이미지 정보를 가져올 수 없습니다.' });
        return;
      }

      const { fileName, mimeType, uri } = (await handlePictures()) as PictureFile;
      const formData = new FormData();
      formData.append('profileImage', {
        uri: uri,
        name: fileName,
        type: mimeType,
      } as any);

      const response = await changeUserProfileImage(formData);
      if (response === 200) {
        setProfileImageChangeSaved(true);
        await AsyncAlert({ message: '프로필 사진이 변경되었습니다.' });
        await userInfo();
        setProfileImageChangeSaved(false);
      }
    } catch (error) {
      //TODO: 400 fileSIze처리하기
      await AsyncAlert({ message: '프로필 사진 변경에 실패하였습니다.' });
      console.log('error', error);
    }
    setIsProfileImageModal(false);
  };

  // TODO: 사진 delete 구현하기
  const handleDeletePictures = async () => {};

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.press}
        onPress={handleCamera}
      >
        <Text style={styles.text}>사진 촬영</Text>
      </Pressable>
      <Pressable
        style={styles.press}
        onPress={handleUploadPictures}
      >
        <Text style={styles.text}>앨범에서 선택</Text>
      </Pressable>
      <Pressable
        style={styles.press}
        onPress={handleDeletePictures}
      >
        <Text style={styles.deleteText}>삭제하기</Text>
      </Pressable>
    </View>
  );
}

export default ProfileImageEditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 18,
    marginVertical: 10,
    zIndex: 100,
  },
  press: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  text: {
    fontWeight: '500',
  },
  deleteText: {
    color: '#E61E38',
    fontWeight: '500',
  },
});
