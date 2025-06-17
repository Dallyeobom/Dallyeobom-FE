import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(-width, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
    );
    -1;
    true;
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>당신의 런닝 파트너</Text>
          {/* <View style={{ width: 200, height: 50 }}>
            <Image source={require('@/assets/images/typo-logo.png')}></Image>
          </View> */}
          <Text style={styles.mainText}>
            가볍게 뛰고 싶을 때, 지금 바로 시작해보세요!
          </Text>
        </View>
        <Animated.View style={[styles.sliderContainer, animatedStyle]}>
          <Animated.Image
            source={require('@/assets/images/background.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Animated.Image
            source={require('@/assets/images/background-2.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
        <View style={styles.button}>
          <Image source={require('@/assets/images/kakao.png')}></Image>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  subContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  sliderContainer: {
    flexDirection: 'row',
    width: '200%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: '25%',
    transform: [{ translateX: -50 }],
    zIndex: 10,
  },
  mainTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
  },
  mainText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default LoginScreen;
