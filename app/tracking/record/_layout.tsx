import { HeaderCloseIcon } from '@/components/icons/CommonIcon';
import { base } from '@/styles/color';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

function TrackingRecordLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '기록하기',
        headerShadowVisible: false,
        header: () => (
          <View style={[styles.headerContainer]}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <HeaderCloseIcon
                width={24}
                height={24}
              />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}

export default TrackingRecordLayout;
const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

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
});
