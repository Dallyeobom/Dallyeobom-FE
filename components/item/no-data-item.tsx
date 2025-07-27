import { gray } from '@/styles/color';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function NoDataItem() {
  return (
    <View style={styles.image}>
      <Image source={require('@/assets/images/priority-high.png')} />
    </View>
  );
}

export default NoDataItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    display: 'flex',
  },
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
