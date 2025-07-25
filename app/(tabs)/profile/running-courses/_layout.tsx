import { Stack } from 'expo-router';
import React from 'react';

function RunningCoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '내가 달린 코스',
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: '#fff',
      }}
    />
  );
}

export default RunningCoursesLayout;
