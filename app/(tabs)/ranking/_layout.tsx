import RankingTitleText from '@/components/text/ranking-title-text';
import { Stack } from 'expo-router';
import React from 'react';

function RankingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitle: () => <RankingTitleText />,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default RankingLayout;
