import { base } from '@/styles/color';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TermsServiceLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '서비스 이용 약관',
        headerStyle: {
          backgroundColor: base['white'],
        },
        headerShadowVisible: false,
        header: () => (
          <View
            style={[
              styles.headerContainer,
              { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Image source={require('@/assets/images/back.png')} />
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

export default TermsServiceLayout;

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
