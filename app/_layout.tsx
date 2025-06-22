import { base } from '@/styles/color';
import { getKeyHashAndroid, initializeKakaoSDK } from '@react-native-kakao/core';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Image } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const kakaoInitFunc = async () => {
    console.log('Kakao SDK 초기화');
    await initializeKakaoSDK('cc8bef820682b89305e2562d11971d99', {
      web: {
        javascriptKey: '33dd7ebac045cbd7cfedcab10f892fb8',
        restApiKey: 'a16d404b0cd5cd014e2124d498d0e096',
      },
    });
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
  if (!loaded) {
    return null;
  }
  const isLoggedIn = false;

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
            options={{ headerShown: true, title: '테스트입니다' }}
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
