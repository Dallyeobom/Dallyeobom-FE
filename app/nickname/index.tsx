import { useAuthStore } from '@/stores/auth-store';
import { base, main } from '@/styles/color';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
function Index() {
  const [nickname, onChangeNickname] = useState('');
  const kakaoSignUp = useAuthStore((state) => state.kakaoSignUp);
  const handleloggedIn = useAuthStore((state) => state.handleloggedIn);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const handleNicknameChange = (text: string) => {
    onChangeNickname(text);
  };

  const handlePress = async () => {
    if (nickname.length < 2) {
      Alert.alert('닉네임을 두글자 이상 작성해주세요', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }
    // 카카오 회원가입 API
    const providerAccessToken = await SecureStore.getItemAsync('providerAccessToken');
    if (!providerAccessToken) {
      Alert.alert('카카오 로그인 정보가 없습니다. 다시 로그인해주세요.');
      router.replace('/login');
      return;
    }
    try {
      const result = await kakaoSignUp(nickname, providerAccessToken);
      if (result.accessToken && result.refreshToken) {
        handleloggedIn();
      }
    } catch (error) {
      throw error;
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
              <Image source={require('@/assets/images/close.png')} />
            </Pressable>
          )}
        </View>
        <View style={styles.nicknameLengthText}>
          <Text>{nickname.length}/15</Text>
        </View>
      </View>

      <Pressable
        onPress={handlePress}
        style={() => [
          styles.nicknameButton,
          {
            backgroundColor: nickname.length > 0 ? main[80] : main[10],
          },
        ]}
      >
        <Text style={styles.buttonText}>가입하기</Text>
      </Pressable>
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
  nicknameButton: {
    height: 56,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
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
