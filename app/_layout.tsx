import { useAuthStore } from '@/stores/auth-store';
import { base } from '@/styles/color';
import { kakaoInitFunc } from '@/utils/kakao';
import { getKeyHashAndroid } from '@react-native-kakao/core';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Image } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const handleloggedIn = useAuthStore((state) => state.handleloggedIn);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const getAccessTokenRefreshToken = async () => {
    // await SecureStore.deleteItemAsync('accessToken');
    // await SecureStore.deleteItemAsync('refreshToken');
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (accessToken && refreshToken) {
      handleloggedIn();
    }
  };
  useEffect(() => {
    kakaoInitFunc()
      .then((data) => {
        console.log('Kakao SDK 초기화 완료', data);
      })
      .then(() => {
        getKeyHashAndroid().then((keyHash) => {
          console.log('Android Key Hash:', keyHash);
        });
      });
  }, []);

  useEffect(() => {
    getAccessTokenRefreshToken();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: base.white,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: () => <Image source={require('@/assets/images/back.png')} />,
        }}
      >
        {/* 로그인이 안되었을때 보이는 장면 */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen
            name="login"
            options={{ headerShown: false, title: '로그인' }}
          />
          <Stack.Screen
            name="nickname"
            options={{ headerShown: true, title: '닉네임 설정' }}
          />
        </Stack.Protected>

        {/* 로그인이 됬을때 보이는 화면 */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
