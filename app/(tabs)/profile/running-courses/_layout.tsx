import { Stack } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function RunningCoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '내가 달린 코스',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerShadowVisible: false,
        header: () => (
          <View style={styles.headerContainer}>
            <Pressable onPress={() => {}}>
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
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    columnGap: 100,
  },

  leftChevronImage: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 18,
  },
});
