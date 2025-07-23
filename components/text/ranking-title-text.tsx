import React from 'react';
import { StyleSheet, Text } from 'react-native';

function RankingTitleText() {
  return <Text style={styles.text}>내 정보</Text>;
}

export default RankingTitleText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 700,
  },
});
