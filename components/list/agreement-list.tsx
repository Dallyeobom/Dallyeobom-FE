import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import { useAuthStore } from '@/stores/auth-store';
import { useModalStore } from '@/stores/modal-store';
import { base, main } from '@/styles/color';
import { AgreementsSchema } from '@/types/auth';
import { processAgreementData, processTermsData } from '@/utils/signup';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface TermsAndConditionlistProps {
  nickname: string;
  setIsAgreementModal: React.Dispatch<React.SetStateAction<boolean>>;
  termsAndConditionData: AgreementsSchema[];
}

function TermsAndConditionlist({
  nickname,
  setIsAgreementModal,
  termsAndConditionData,
}: TermsAndConditionlistProps) {
  const [agreementData, setGreemenetData] = useState(
    processAgreementData(termsAndConditionData),
  );
  const [isButtonActive, setIsButtonActive] = useState(false);

  const kakaoSignUp = useAuthStore((state) => state.kakaoSignUp);
  const { setModalVisible } = useModalStore(); // 위치 모달
  const handleloggedIn = useAuthStore((state) => state.handleloggedIn);

  const router = useRouter();

  const handlePress = async () => {
    setIsAgreementModal(false);
    const providerAccessToken = await SecureStore.getItemAsync('providerAccessToken');
    if (!providerAccessToken) {
      Alert.alert('카카오 로그인 정보가 없습니다. 다시 로그인해주세요.');
      router.replace('/login');
      return;
    }

    const termsData = processTermsData(agreementData);

    const result = await kakaoSignUp(nickname, providerAccessToken, termsData);
    if (result && result.accessToken && result.refreshToken) {
      Alert.alert('회원가입 성공', '회원가입에 성공하였습니다.', [
        {
          text: '확인',
          onPress: () => {
            setModalVisible(true);
            handleloggedIn();
            router.replace('/(tabs)');
          },
        },
      ]);
    } else {
      Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleToggle = (type: string) => {
    if (type === 'all') {
      setGreemenetData((prev) => {
        const copyPrev = [...prev];
        const targetItem = copyPrev.find((item) => item.type === type);
        if (targetItem) {
          const targetChecked = targetItem.isCheck;
          if (targetChecked) {
            setIsButtonActive(false);
            return copyPrev.map((item) => {
              return { ...item, isCheck: false };
            });
          } else {
            setIsButtonActive(true);

            return copyPrev.map((item) => {
              return { ...item, isCheck: true };
            });
          }
        }
        return copyPrev;
      });
    } else {
      setGreemenetData((prev) => {
        const copyPrev = [...prev];
        const targetItem = copyPrev.find((item) => item.type === type);

        if (targetItem) {
          const newItem = { ...targetItem, isCheck: !targetItem.isCheck };
          const targetIndex = copyPrev.indexOf(targetItem);
          copyPrev[targetIndex] = newItem;
        }

        const falseCheckItem = copyPrev.filter(
          (item) => item.type !== 'all' && !item.isCheck,
        );
        const allItem = copyPrev.find((item) => item.type === 'all');
        if (allItem) {
          if (falseCheckItem.length > 0 && allItem.isCheck) {
            const newAllItem = { ...allItem, isCheck: false };
            const targetIndex = copyPrev.indexOf(allItem);
            copyPrev[targetIndex] = newAllItem;
          }
          if (falseCheckItem.length === 0 && !allItem.isCheck) {
            const newAllItem = { ...allItem, isCheck: true };
            const targetIndex = copyPrev.indexOf(allItem);
            copyPrev[targetIndex] = newAllItem;
          }
        }

        const requiredItems = copyPrev.filter((item) => item.required && item.isCheck);
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
      <View>
        {agreementData.map((item) => {
          const { id, name, type, isCheck } = item;
          return (
            <TermsAndConditionAgreement
              key={id}
              id={id}
              name={name}
              type={type}
              isCheck={isCheck}
              onToggle={() => handleToggle(type)}
            />
          );
        })}
      </View>
      <Pressable
        disabled={!isButtonActive && true}
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
