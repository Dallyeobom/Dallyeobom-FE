import { base } from '@/styles/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Search() {
  return (
    <View style={styles.container}>
      <Text>검색</Text>
    </View>
  );
}

export default Search;

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
