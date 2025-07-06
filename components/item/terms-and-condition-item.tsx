import PurPleCheckBox from '@/components/checkbox';
import { TermsAndConditionItemSchema } from '@/types/item';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
function TermsAndConditionAgreement({
  id,
  label,
  required,
  checked,
}: TermsAndConditionItemSchema) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <PurPleCheckBox />
          <Text>{label}</Text>
        </View>
        <View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="gray"
          />
        </View>
      </View>
    </View>
  );
}

export default TermsAndConditionAgreement;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    rowGap: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
});
