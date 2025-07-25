import { Stack } from 'expo-router';
import React from 'react';

function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: '내 프로필',
        }}
      />
      <Stack.Screen
        name="running-courses"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default ProfileLayout;
