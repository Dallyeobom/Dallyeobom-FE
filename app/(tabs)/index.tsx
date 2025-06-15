import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Index() {
  return (
    <View style={styles.container}>
      <Text>페이지</Text>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
