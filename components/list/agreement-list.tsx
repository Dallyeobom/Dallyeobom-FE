import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import { termsAndConditionData } from '@/mocks/data';
import { base, main } from '@/styles/color';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TermsAndConditionlist() {
  // const isAllkey = useCheckBoxStore((state) => state.isAllKey);
  // const isServiceKey = useCheckBoxStore((state) => state.isServiceKey);
  // console.log('isAll', isAllkey, ' isServiceKey', isServiceKey);
  const [agreementData, setGreemenetData] = useState(termsAndConditionData);
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      {/* <VerticalList
        data={agreementData}
        renderItem={TermsAndConditionAgreement}
        keyExtractor={(item) => item.id.toString()}
      /> */}
      {agreementData.map((item) => {
        const { id, label, required, checked, key } = item;
        return (
          <TermsAndConditionAgreement
            id={id}
            label={label}
            required={required}
            checked={checked}
            key={key}
          />
        );
      })}
      <Pressable
        onPress={handlePress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>확인</Text>
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
    flexDirection: 'column',
    marginHorizontal: 16,
    marginVertical: 32,
    rowGap: 10,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 8,
    backgroundColor: main[80],
  },
  buttonText: {
    fontSize: 16,
    color: base.white,
    fontWeight: '500',
  },
});
