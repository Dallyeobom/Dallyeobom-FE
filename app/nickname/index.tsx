import AsyncAlert from '@/components/alert/async-alert';
import { CloseIcon } from '@/components/icons/CommonIcon';
import TermsAndConditionlist from '@/components/list/agreement-list';
import PrivacyServiceList from '@/components/list/privacy-service-list';
import PushServiceList from '@/components/list/push-service-list';
import TermsServiceList from '@/components/list/terms-service-list';
import BottomUpModal from '@/components/modal/bottom-up-modal';
import { useAuthStore } from '@/stores/auth-store';
import { base, main } from '@/styles/color';
import { AgreementsSchema } from '@/types/auth';
import { showErrorAlert } from '@/utils/error-handler';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Index() {
  const [nickname, onChangeNickname] = useState('');
  const [isAgreementModal, setIsAgreementModal] = useState(false);
  const [agreemenDatailNumber, setAgreementDetailNumber] = useState<number | null>(null);
  const [termsAndConditionData, setTermsAndConditionData] = useState<AgreementsSchema[]>(
    [],
  );

  const doubleCheckNickname = useAuthStore((state) => state.doubleCheckNickname);
  const termsList = useAuthStore((state) => state.termsList);

  const insets = useSafeAreaInsets();
  const handleNicknameChange = (text: string) => {
    onChangeNickname(text);
  };

  const handlePress = async () => {
    if (nickname.length < 2) {
      await AsyncAlert({ message: '닉네임을 두글자 이상 작성해주세요' });
      return;
    }

    try {
      const data = await doubleCheckNickname(nickname);

      if (data?.isDuplicated) {
        Alert.alert('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
        return;
      }
    } catch (error) {
      Alert.alert('닉네임 검증에 실패했습니다. 다시 검증해주세요');
      return;
    }

    try {
      const result = await termsList();
      setTermsAndConditionData(result);
      setIsAgreementModal(true);
    } catch (error) {
      showErrorAlert(error, 'TERMS', '약관 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleDelete = () => {
    onChangeNickname('');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>반갑습니다!</Text>
          <Text style={styles.title}>어떻게 불러드릴까요?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, nickname.length > 0 && styles.inputActiveBorder]}
            onChangeText={handleNicknameChange}
            value={nickname}
            placeholder="닉네임 입력"
          />
          {nickname.length > 0 && (
            <Pressable
              style={styles.image}
              onPress={handleDelete}
            >
              <CloseIcon
                width={24}
                height={24}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.nicknameLengthText}>
          <Text>{nickname.length}/15</Text>
        </View>
      </View>

      <Pressable
        onPress={handlePress}
        style={[
          styles.button,
          {
            backgroundColor: nickname.length > 0 ? main[80] : main[10],
          },
        ]}
      >
        <Text style={styles.buttonText}>가입하기</Text>
      </Pressable>

      {isAgreementModal && (
        <BottomUpModal close={() => setIsAgreementModal(false)}>
          <TermsAndConditionlist
            nickname={nickname}
            setIsAgreementModal={setIsAgreementModal}
            termsAndConditionData={termsAndConditionData}
            setAgreementDetailNumber={setAgreementDetailNumber}
          />
        </BottomUpModal>
      )}
      {agreemenDatailNumber && (
        <BottomUpModal close={() => setAgreementDetailNumber(null)}>
          {agreemenDatailNumber === 4 && <TermsServiceList />}
          {agreemenDatailNumber === 2 && <PrivacyServiceList />}
          {agreemenDatailNumber === 3 && <PushServiceList />}
        </BottomUpModal>
      )}
    </View>
  );
}
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: base.white,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  subContainer: {
    display: 'flex',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: base.white,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },

  input: {
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
  inputActiveBorder: {
    borderWidth: 1,
    borderColor: main[80],
    borderRadius: 8,
  },
  image: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: '30%',
    right: 10,
  },
  nicknameLengthText: {
    alignSelf: 'flex-end',
  },
});
