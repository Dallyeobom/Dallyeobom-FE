import { gray } from '@/styles/color';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const renderRankIcon = (index: number) => {
  // 상위 랭킹 트로피 이미지로 등수 표기
  const trophyImages = [
    require('@/assets/images/trophy-gold.png'),
    require('@/assets/images/trophy-silver.png'),
    require('@/assets/images/trophy-bronze.png'),
  ];

  if (index < trophyImages.length) {
    return (
      <Image
        source={trophyImages[index]}
        style={styles.trophyIcon}
      />
    );
  }

  return (
    <View style={styles.userRankNumber}>
      <Text style={styles.rankNumberText}>{index + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trophyIcon: {
    width: 24,
    height: 24,
  },
  userRankNumber: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: gray[100],
  },
});
