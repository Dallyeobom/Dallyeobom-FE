import React from 'react';
import { StyleSheet, Text } from 'react-native';

function RankingTitleText() {
  return <Text style={styles.text}>랭킹</Text>;
}

export default RankingTitleText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 700,
  },
});
