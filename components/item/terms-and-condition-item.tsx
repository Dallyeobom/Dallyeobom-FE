import PurPleCheckBox from '@/components/checkbox';

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
function TermsAndConditionAgreement({
  id,
  name,
  required,

  type,
 onToggle,
 isCheck,


}: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <PurPleCheckBox
            type={type}
            isCheck={isCheck}
            onToggle={onToggle}
          />
          <Text>{name}</Text>
        </View>
        {type !== 'all' && (
          <View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="gray"
            />
          </View>
        )}
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
