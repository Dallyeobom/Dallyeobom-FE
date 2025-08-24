import { gray } from '@/styles/color';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function NoFavoriteItem() {
  return (
    <View style={styles.image}>
      <Image source={require('@/assets/images/dot.png')} />
    </View>
  );
}

export default NoFavoriteItem;

const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: gray[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
