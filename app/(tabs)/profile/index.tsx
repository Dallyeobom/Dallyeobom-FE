import { base, gray } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function Profile() {
  const router = useRouter();
  const handleRunningCourses = () => {
    router.push('/(tabs)/profile/running-courses');
  };

  return (
    <View style={styles.container}>
      <View style={styles.pictureSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('@/assets/images/user-profile.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <View style={styles.cameraImageContainer}>
            <Image
              source={require('@/assets/images/camera.png')}
              style={styles.cameraImage}
            />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>윤지수</Text>
          <Image
            source={require('@/assets/images/mode.png')}
            style={styles.modeImage}
          />
        </View>
      </View>
      <View style={styles.gap} />
      <View style={styles.section}>
        <Pressable
          style={styles.titleBarContainer}
          onPress={handleRunningCourses}
        >
          <View style={styles.titleBar}>
            <Text style={styles.title}>내가 달린 코스</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>내 기록</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>내 찜 코스</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>
      </View>
      <View style={styles.gap} />

      {/* 기록 컨테이너 */}
      <View style={styles.section}>
        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>개인정보 보호</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>서비스 이용 약관</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>로그아웃</Text>
          </View>
        </Pressable>
        <Pressable style={styles.titleBarContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>탈퇴하기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: base['white'],
    flex: 1,
  },
  section: {
    display: 'flex',
    rowGap: 22,
    padding: 10,
    paddingTop: 28,
  },
  gap: {
    height: 12,
    backgroundColor: gray[10],
  },

  titleBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  pictureSection: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 20,
  },

  profileImageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 33,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },

  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
    columnGap: 4,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },

  cameraImageContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    right: 0,
  },
  cameraImage: {
    width: 32,
    height: 32,
  },
  modeImage: {
    width: 24,
    height: 24,
  },
});
