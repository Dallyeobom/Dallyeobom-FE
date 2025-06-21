import RootLayout from '@/app/_layout';
import { useAuthStore } from '@/stores/auth-store';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Alert, AppRegistry, Pressable, StyleSheet, Text, View } from 'react-native';

interface ExpoConfig {
  expo?: {
    name?: string;
  };
  extra?: {
    googleMapsApiKey?: string;
  };
}

const config = Constants.expoConfig as ExpoConfig;
const appName = config?.expo?.name || 'dallyeobom-app';

async function enableMocking() {
  if (!__DEV__) {
    return;
  }
  await import('@/msw.polyfills');
  const { server } = await import('@/mocks/server');
  server.listen({ onUnhandledRequest: 'error' });
}

enableMocking().then(() => {
  AppRegistry.registerComponent(appName, () => RootLayout);
});

export default function HomeScreen() {
  const { userId, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('', '로그아웃하시겠습니까?', [
      {
        text: '로그아웃',
        onPress: logout,
      },
      { text: '취소' },
    ]);
  };

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
