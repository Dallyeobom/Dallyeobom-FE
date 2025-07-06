import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import VerticalList from '@/components/list/verical-list';
import { agreementData } from '@/mocks/data';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TermsAndConditionlist() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <VerticalList
          data={agreementData}
          renderItem={TermsAndConditionAgreement}
        />
      </View>
      <Pressable style={styles.button}>
        <Text>확인</Text>
      </Pressable>
    </View>
  );
}

export default TermsAndConditionlist;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: 'blue',
  },
});
