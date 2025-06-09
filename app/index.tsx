import RootLayout from '@/app/_layout';
import { useAuthStore } from '@/stores/auth-store';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, AppRegistry, Pressable, StyleSheet, Text, View } from 'react-native';
import appConfig from '../app.json';
async function enableMocking() {
  if (!__DEV__) {
    return;
  }
  await import('../msw.polyfills');
  const { server } = await import('../mocks/server');
  server.listen({ onUnhandledRequest: 'error' });
}

enableMocking().then(() => {
  AppRegistry.registerComponent(appConfig.expo.name, () => RootLayout);
});
export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { userId, logout } = useAuthStore();
  const router = useRouter();

  // 아래 얘 때문에 에러가 난다
  // useEffect(() => {
  //   if (!userId) {
  //     router.replace('/login');
  //   }
  // }, [router, userId]);

  const handleLogout = () => {
    Alert.alert('', '로그아웃하시겠습니까?', [
      {
        text: '로그아웃',
        onPress: logout,
      },
      { text: '취소' },
    ]);
  };

  const handleGetLocation = () => {
    let text = 'Waiting...';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  };
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>헤더 영역</Text>
      </View>
      <Text>현재 사용자: {userId}</Text>
      <Pressable onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </Pressable>
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            router.push('/login');
          }}
        >
          <Text style={styles.logoutText}>로그인페이지로가기</Text>
        </Pressable>
      </View>
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            router.push('/signup');
          }}
        >
          <Text style={styles.logoutText}>회원가입페이지로가기</Text>
        </Pressable>
      </View>
      <View style={styles.button}>
        <Pressable onPress={handleGetLocation}>
          <Text style={styles.logoutText}>위치 정보 가져오기</Text>
          <Text>{JSON.stringify(location)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '400',
  },
  button: {
    borderColor: 'blue',
    borderWidth: 2,
    marginBottom: 2,
  },
});
