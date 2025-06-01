import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const router = useRouter();

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('에러', '아이디, 비밀번호 모두 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(userId, password);
      console.log('Login API 결과입니다', result);
      Alert.alert('성공', '로그인되었습니다.');
      router.push('/');
    } catch (err: any) {
      Alert.alert('로그인 실패', err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={userId}
          onChangeText={setUserId}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title="로그인2222222"
            onPress={handleLogin}
          />
        )}
      </View>
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

export default LoginScreen;
