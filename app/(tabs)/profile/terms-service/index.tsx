import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

function Index() {
  return (
    <ScrollView style={styles.wrapper}>
      {/* {termsOfService.map((term, index) => {
        return (
          <View
            key={index}
            style={styles.term}
          >
            <Text style={styles.title}>{term.title}</Text>
            <Text style={styles.body}>{term.body}</Text>
          </View>
        );
      })} */}
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
    columnGap: 120,
    paddingVertical: 10,
  },
  headerTitle: {
    fontWeight: '700',
  },
  wrapper: {
    flex: 1,
    paddingBottom: 40,
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
