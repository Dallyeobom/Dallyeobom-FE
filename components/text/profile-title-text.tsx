import React from 'react';
import { StyleSheet, Text } from 'react-native';

function ProfileTitleText() {
  return <Text style={styles.text}>프로필</Text>;
}

export default ProfileTitleText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
