import { TermsDetail } from '@/api/auth/auth.service';
import PurPleCheckBox from '@/components/checkbox';

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TermsAndConditionAgreementProps {
  id: number;
  name: string;
  type: string;
  isCheck: boolean;
  onToggle: () => void;
  setAgreementDetailNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

function TermsAndConditionAgreement({
  id,
  name,
  type,
  isCheck,
  onToggle,
  setAgreementDetailNumber,
}: TermsAndConditionAgreementProps) {
  const handlePress = async (id: number) => {
    setAgreementDetailNumber(id);
    const result = await TermsDetail(id);
    console.log('RESULT입니다아 ===>', result);
  };

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
          <Pressable onPress={() => handlePress(id)}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="gray"
            />
          </Pressable>
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
