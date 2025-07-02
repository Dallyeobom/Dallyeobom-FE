import { base, gray } from '@/styles/color';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function Ranking() {
  // TODO: Wrrapper 혹은 HOC 를 사용하여 컴퍼넌트를 만들어보기
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menu}>주간</Text>
        </Pressable>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menu}>월간</Text>
        </Pressable>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menu}>연간</Text>
        </Pressable>
      </View>
      {/* 컴퍼넌트에 따라 다라지는 데이터 */}
      <Text>데이토</Text>
    </View>
  );
}

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: base['white'],
  },

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: base['white'],
    borderBottomColor: gray[15],
    borderBottomWidth: 1,
  },
  menuButton: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 16,
    display: 'flex',
    alignItems: 'center',
  },

  menu: {
    fontSize: 16,
    fontWeight: 600,
    color: gray[30],
  },
});
