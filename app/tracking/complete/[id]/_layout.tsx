import { base } from '@/styles/color';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function TrackingCompleteDetailLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
            <Text style={styles.title}>코스 정보</Text>
          </View>
        ),
      }}
    />
  );
}

export default TrackingCompleteDetailLayout;
const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 130,
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

  title: {
    fontWeight: '700',
  },
});
