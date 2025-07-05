import { base } from '@/styles/color';
import { Stack } from 'expo-router';

export default function CourseLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: base.white,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="[id]/photos" />
    </Stack>
  );
}
