import Ionicons from '@expo/vector-icons/Ionicons';
import { PlatformPressable } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import React from 'react';

function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          title: 'Ranking',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? 'star' : 'star-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              name={focused ? 'search' : 'search-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
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
