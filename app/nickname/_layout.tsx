import { Stack } from 'expo-router';
import React from 'react';

function NicknameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="nickname" />
    </Stack>
  );
}

export default NicknameLayout;
