import { Stack } from 'expo-router';
import React from 'react';

function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerBackVisible: false,
        headerShadowVisible: false,
        headerTitle: () => null,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default SearchLayout;
