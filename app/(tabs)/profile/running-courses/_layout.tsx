import { Stack } from 'expo-router';
import React from 'react';

function RunningCoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '내가 달린 코스',
        headerStyle: {
          // backgroundColor: 'red',
        },
        headerShadowVisible: false,
        headerLeft: () => null,

        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    />
  );
}

export default RunningCoursesLayout;
