import { gray } from '@/styles/color';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface NoDataItemProps {
  source: ImageSourcePropType;
}

function NoDataItem({ source }: NoDataItemProps) {
  return (
    <View style={styles.image}>
      <Image source={source} />
    </View>
  );
}

export default NoDataItem;

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
