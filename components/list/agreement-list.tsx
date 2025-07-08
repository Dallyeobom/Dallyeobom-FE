import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import { termsAndConditionData } from '@/mocks/data';

import { base, main } from '@/styles/color';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TermsAndConditionlist() {
  const [agreementData, setGreemenetData] = useState(termsAndConditionData);

  const handlePress = () => {};

  const handleToggle = (name: string) => {
    if (name === 'all') {
      setGreemenetData((prev) => {
        const copyPrev = [...prev];
        const targetItem = copyPrev.find((item) => item.name == name);
        if (targetItem) {
          const targetChecked = targetItem.checked;
          if (targetChecked) {
            return copyPrev.map((item) => {
              return { ...item, checked: false };
            });
          } else {
            return copyPrev.map((item) => {
              return { ...item, checked: true };
            });
          }
        }
        return copyPrev;
      });
    } else {
      setGreemenetData((prev) => {
        const copyPrev = [...prev];
        const targetItem = copyPrev.find((item) => item.name === name);

        if (targetItem) {
          const newItem = { ...targetItem, checked: !targetItem.checked };
          const targetIndex = copyPrev.indexOf(targetItem);
          copyPrev[targetIndex] = newItem;
        }

        return copyPrev;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {agreementData.map((item, index) => {
          const { id, label, required, checked, name } = item;
          return (
            <TermsAndConditionAgreement
              key={id}
              id={id}
              label={label}
              required={required}
              checked={checked}
              name={name}
              onToggle={() => handleToggle(name)}
            />
          );
        })}
      </View>
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
    marginHorizontal: 18,
    marginVertical: 10,
    rowGap: 20,
  },
  subContainer: {},

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    backgroundColor: main[80],
  },
  buttonText: {
    fontSize: 16,
    color: base.white,
    fontWeight: '500',
  },
});
