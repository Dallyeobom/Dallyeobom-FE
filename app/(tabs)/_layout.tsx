import {
  HomeFillIcon,
  HomeIcon,
  ProfileFillIcon,
  ProfileIcon,
  RankingFillIcon,
  RankingIcon,
  SearchFillIcon,
  SearchIcon,
} from '@/components/icons/TabIcon';
import { gray } from '@/styles/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PlatformPressable } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

interface TabIconProps {
  focused: boolean;
  ActiveIcon: React.ComponentType<SvgProps>;
  InactiveIcon: React.ComponentType<SvgProps>;
  label: string;
  isWideText?: boolean;
}

function TabIcon({ focused, ActiveIcon, InactiveIcon, label, isWideText }: TabIconProps) {
  const IconComponent = focused ? ActiveIcon : InactiveIcon;

  return (
    <View style={styles.tabIconContainer}>
      <IconComponent
        width={24}
        height={24}
        style={{
          opacity: focused ? 1 : 0.5,
        }}
      />
      <Text
        style={[
          focused ? styles.tabIconActiveText : styles.tabIconInactiveText,
          isWideText && styles.wideText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function TabLayout() {
  const renderTabButton = (props: React.ComponentProps<typeof PlatformPressable>) => (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: gray[100],
        tabBarInactiveTintColor: gray[30],
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarLabel: () => null,
          tabBarButton: renderTabButton,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              ActiveIcon={RankingFillIcon}
              InactiveIcon={RankingIcon}
              label="랭킹"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarButton: renderTabButton,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              ActiveIcon={HomeFillIcon}
              InactiveIcon={HomeIcon}
              label="홈"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: () => null,
          tabBarButton: renderTabButton,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              ActiveIcon={SearchFillIcon}
              InactiveIcon={SearchIcon}
              label="검색"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarButton: renderTabButton,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              ActiveIcon={ProfileFillIcon}
              InactiveIcon={ProfileIcon}
              label="내 정보"
              isWideText
            />
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
  tabBarStyle: {
    height: 60,
    paddingTop: 10,
    backgroundColor: gray[5],
    borderTopWidth: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabIconActiveText: {
    color: gray[100],
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabIconInactiveText: {
    color: gray[30],
    fontSize: 12,
    fontWeight: 'bold',
  },
  wideText: {
    width: 100,
    textAlign: 'center',
  },
});
