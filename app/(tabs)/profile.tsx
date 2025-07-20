import { base } from '@/styles/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Profile() {
  return (
    <View style={styles.container}>
      <Text>프로필</Text>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: base['white'],
  },
  subContainer: {
    flex: 1,
    width: '100%',
  },
  locationTextContainer: {
    width: '100%',
  },
});
