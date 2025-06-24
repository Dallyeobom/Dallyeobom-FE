import { useAuthStore } from '@/stores/auth-store';
import { login } from '@react-native-kakao/user';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
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
  const KaKaoLogin = useAuthStore((state) => state.kakaoLogin);
  const handleloggedIn = useAuthStore((state) => state.handleloggedIn);

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLogin = async () => {
    try {
      const kakaoLoginResult = await login();
      if (!kakaoLoginResult.accessToken) {
        Alert.alert('로그인 실패', '카카오 로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }
      const result = await KaKaoLogin(kakaoLoginResult.accessToken);
      if (result.isNewUser) {
        router.push('/nickname');
      } else {
        handleloggedIn();
      }
    } catch (e) {
      Alert.alert('로그인 실패', '카카오 로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.subContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>당신의 런닝 파트너</Text>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 220, height: 48 }}
              source={require('@/assets/images/typo-logo.png')}
            />
          </View>
          <Text style={styles.subText}>가볍게 뛰고 싶을 때, 지금 바로 시작해보세요!</Text>
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
        <View style={styles.loginButtonContainer}>
          <View>
            <Image
              style={{ width: 260 }}
              source={require('@/assets/images/tooltip.png')}
            ></Image>
          </View>
          <View style={styles.kakaoButton}>
            <Image source={require('@/assets/images/kakao-symbol.png')}></Image>
            <Pressable onPress={handleLogin}>
              <Text style={styles.kakaoButtonText}>카카오톡으로 3초만에 시작하기</Text>
            </Pressable>
          </View>
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

  mainTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  mainText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
  },

  loginButtonContainer: {
    position: 'absolute',
    bottom: 40,
    zIndex: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: '90%',
  },
  kakaoButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
});

export default LoginScreen;
