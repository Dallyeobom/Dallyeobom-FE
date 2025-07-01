import { gray } from '@/styles/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PlatformPressable } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: gray[100],
        tabBarInactiveTintColor: gray[30],
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          backgroundColor: gray[5],
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={
                  focused
                    ? require('@/assets/images/ranking-fill.png')
                    : require('@/assets/images/ranking.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={focused ? styles.tabIconFilledext : styles.tabIconText}>
                랭킹
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={
                  focused
                    ? require('@/assets/images/home-fill.png')
                    : require('@/assets/images/home.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={focused ? styles.tabIconFilledext : styles.tabIconText}>
                홈
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={
                  focused
                    ? require('@/assets/images/search-fill.png')
                    : require('@/assets/images/search.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text style={focused ? styles.tabIconFilledext : styles.tabIconText}>
                검색
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={
                  focused
                    ? require('@/assets/images/profile-fill.png')
                    : require('@/assets/images/profile.png')
                }
                style={{
                  width: 24,
                  height: 24,
                  tintColor: color,
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text
                style={[
                  focused ? styles.tabIconFilledext : styles.tabIconText,
                  styles.text,
                ]}
              >
                내 정보
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          href: null,
          title: 'Test',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;

export const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: 100,
    textAlign: 'center',
  },
  tabIconText: {
    color: gray[30],
  },
  tabIconFilledext: {
    color: gray[100],
  },
});
