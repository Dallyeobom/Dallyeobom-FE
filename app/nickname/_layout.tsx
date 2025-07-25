import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function NicknameLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        // NicknameLayout에서 정의한 헤더를 보여줄지의 여부
        headerShown: true,

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitle: () => (
          <TouchableOpacity
            onPress={() => {
              router.replace('/login');
            }}
          >
            <Image source={require('@/assets/images/back.png')} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="nickname" />
    </Stack>
  );
}

export default NicknameLayout;
