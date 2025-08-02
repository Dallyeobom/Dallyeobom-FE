import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ProfileImageEditCard() {
  return (
    <View style={styles.container}>
      <View>
        <Text>사진 촬영</Text>
      </View>
      <View>
        <Text>앨범에서 선택</Text>
      </View>
      <View>
        <Text>삭제 하기</Text>
      </View>
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
    rowGap: 20,
    zIndex: 100,
  },
});
