import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const SignUpScreen: React.FC = () => {
  const [nickName, setNickName] = useState('');
  const signup = useAuthStore((state) => state.signup);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!nickName) {
      Alert.alert('에러', '닉네임을 입력해주세요');
      return;
    }
    try {
      const result = await signup(nickName);
      if (result >= 400) {
        return Alert.alert('Error', '회원가입에 실패하였습니다다');
      }
      Alert.alert('success', '회원가입에 성공하였습니다', [
        { text: 'OK', onPress: () => router.navigate('/') },
      ]);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={nickName}
          onChangeText={setNickName}
        />
      </View>
      <Button
        title="회원가입"
        onPress={handleSignUp}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default SignUpScreen;
