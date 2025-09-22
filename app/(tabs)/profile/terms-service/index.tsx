import { base } from '@/styles/color';
import { termsOfService } from '@/utils/agreement-detail';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Index() {
  return (
    <ScrollView style={styles.wrapper}>
      {termsOfService.map((term, index) => {
        return (
          <View
            key={index}
            style={styles.term}
          >
            <Text style={styles.title}>{term.title}</Text>
            <Text style={styles.body}>{term.body}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: base['white'],
  },
  term: {
    marginBottom: 20,
    display: 'flex',
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },

  body: {
    fontSize: 14,
  },
});
