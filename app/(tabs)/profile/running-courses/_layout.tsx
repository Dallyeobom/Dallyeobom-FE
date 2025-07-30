import { base } from '@/styles/color';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function RunningCoursesLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '내가 달린 코스',
        headerStyle: {
          backgroundColor: base['white'],
        },
        headerShadowVisible: false,
        header: () => (
          // insets.top이 paddingTop에 적용이 잘 안되는듯?
          <View style={[styles.headerContainer, { paddingTop: 40 }]}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              {/* <Ionicons
                name="chevron-back"
                size={24}
                color="#9CA3AF"
                style={styles.chevronIcon}
              /> */}
              <Image
                source={require('@/assets/images/left-chevron.png')}
                style={styles.leftChevronImage}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.headerText}>내가 달린 코스</Text>
          </View>
        ),

        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    />
  );
}

export default RunningCoursesLayout;

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
  },
  chevronIcon: {
    marginTop: 4,
  },
});
