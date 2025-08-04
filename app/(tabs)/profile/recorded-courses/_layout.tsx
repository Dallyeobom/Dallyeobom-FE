import { base } from '@/styles/color';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function RecordedCoursesLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '내 기록',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: base['white'],
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        header: () => (
          <View style={[styles.headerContainer, { paddingTop: 40 }]}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Image
                source={require('@/assets/images/left-chevron.png')}
                style={styles.leftChevronImage}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.headerText}>내 기록</Text>
          </View>
        ),
      }}
    />
  );
}

export default RecordedCoursesLayout;
const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 100,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: base['white'],
  },

  leftChevronImage: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  chevronIcon: {
    marginTop: 4,
  },
});
