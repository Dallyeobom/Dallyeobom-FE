import { base } from '@/styles/color';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export const useControlTabBar = (condition: boolean) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;

    if (condition) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      parent.setOptions({
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          backgroundColor: base.white,
          borderTopWidth: 0,
        },
      });
    }
  }, [condition]);
};
