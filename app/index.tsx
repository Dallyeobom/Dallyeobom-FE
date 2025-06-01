import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>헤더 영역</Text>
      </View>
      <Text>현재 사용자: {userId}</Text>
      <Pressable onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </Pressable>
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
});
