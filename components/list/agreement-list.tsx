import TermsAndConditionAgreement from '@/components/item/terms-and-condition-item';
import { termsAndConditionData } from '@/mocks/data';
import { useAuthStore } from '@/stores/auth-store';
import { useModalStore } from '@/stores/modal-store';
import { base, main } from '@/styles/color';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface TermsAndConditionlist {
  nickname: string;
  setIsAgreementModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function TermsAndConditionlist({ nickname, setIsAgreementModal }: TermsAndConditionlist) {
  const [agreementData, setGreemenetData] = useState(termsAndConditionData);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const kakaoSignUp = useAuthStore((state) => state.kakaoSignUp);
  const { setModalVisible } = useModalStore(); // 위치 모달 TODO: 추후에 이름 변경하기  무슨 모달인지 잘 X
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
    try {
      const result = await kakaoSignUp(nickname, providerAccessToken);
      if (result.accessToken && result.refreshToken) {
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
      }
    } catch (error) {
      Alert.alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
