import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const handleKaKaoLogin = async () => {};

  return <View style={[styles.container, { paddingTop: insets.top }]}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
