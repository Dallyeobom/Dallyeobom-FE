import RankingTitleText from '@/components/text/ranking-title-text';
import { Stack } from 'expo-router';
import React from 'react';

function Ranking() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitle: () => <RankingTitleText />,
      }}
    >
      <Stack.Screen name="ranking" />
    </Stack>
  );
}

export default Ranking;
