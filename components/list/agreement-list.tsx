import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import { termsAndConditionData } from '@/mocks/data';

import { base, main } from '@/styles/color';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TermsAndConditionlist() {
  const [agreementData, setGreemenetData] = useState(termsAndConditionData);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePress = () => {};

  const handleToggle = (name: string) => {
    if (name === 'all') {
      setGreemenetData((prev) => {
        const copyPrev = [...prev];
        const targetItem = copyPrev.find((item) => item.name == name);
        if (targetItem) {
          const targetChecked = targetItem.checked;
          if (targetChecked) {
            setIsButtonActive(false);
            return copyPrev.map((item) => {
              return { ...item, checked: false };
            });
          } else {
            setIsButtonActive(true);

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

        const falseCheckItem = copyPrev.filter(
          (item) => item.name !== 'all' && !item.checked,
        );
        const allItem = copyPrev.find((item) => item.name === 'all');
        if (allItem) {
          if (falseCheckItem.length > 0 && allItem.checked) {
            const newAllItem = { ...allItem, checked: false };
            const targetIndex = copyPrev.indexOf(allItem);
            copyPrev[targetIndex] = newAllItem;
          }
          if (falseCheckItem.length === 0 && !allItem.checked) {
            const newAllItem = { ...allItem, checked: true };
            const targetIndex = copyPrev.indexOf(allItem);
            copyPrev[targetIndex] = newAllItem;
          }
        }

        const requiredItems = copyPrev.filter((item) => item.required && item.checked);
        if (requiredItems.length === 2) {
          setIsButtonActive(true);
        }
        if (requiredItems.length < 2) {
          setIsButtonActive(false);
        }

        return copyPrev;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {agreementData.map((item) => {
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
        style={[styles.button, { backgroundColor: isButtonActive ? main[80] : main[20] }]}
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
