import { marketingConsentTerms } from '@/utils/agreement-detail';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

function PushServiceList() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.wrapper}>
        {marketingConsentTerms.map((term, index) => {
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
    </SafeAreaView>
  );
}

export default PushServiceList;

const styles = StyleSheet.create({
  safeArea: {
    height: 800,
  },
  wrapper: {
    flex: 1,
    padding: 16,
  },
  term: {
    marginBottom: 20,
    display: 'flex',
  },
  title: {
    fontWeight: 700,
    marginBottom: 6,
  },

  body: {
    fontSize: 16,
  },
});
