import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncAlert from '../alert/async-alert';

function ProfileImageEditCard() {
  const handleCamera = async () => {
    //  {"canAskAgain": true, "expires": "never", "granted": false, "status": "undetermined"}
    // 사용자에게 아직 권한 요청을 한 적 없음 (status: undertermined), granted: false => 권한 허용이 안됨
    const { canAskAgain, granted } = await ImagePicker.getCameraPermissionsAsync();
    if (granted) {
      await ImagePicker.launchCameraAsync();
      return;
    }

    // 권한 요청을 할 수 있을 경우
    if (canAskAgain) {
      const { granted: newGranted } = await ImagePicker.requestCameraPermissionsAsync();
      if (newGranted) {
        await ImagePicker.launchCameraAsync();
        return;
      }
      await AsyncAlert({ message: '카메라를 사용하려면 권한이 필요합니다.' });
      return;
    }

    // 권한 요청을 할 수 없을 경우
    await AsyncAlert({ message: '설정 > 앱에서 카메라 권한을 직접 허용해주세요.' });
    Linking.openSettings();
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.press}
        onPress={handleCamera}
      >
        <Text style={styles.text}>사진 촬영</Text>
      </Pressable>
      <Pressable style={styles.press}>
        <Text style={styles.text}>앨범에서 선택</Text>
      </Pressable>
      <Pressable style={styles.press}>
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
