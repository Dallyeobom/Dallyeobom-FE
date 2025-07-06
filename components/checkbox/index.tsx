import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

function PurPleCheckBox() {
  return (
    <Pressable>
      <Image
        source={require('@/assets/images/checkbox-fill.png')}
        style={styles.image}
      />
    </Pressable>
  );
}

export default PurPleCheckBox;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 24,
    height: 24,
  },
});
