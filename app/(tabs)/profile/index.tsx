import NickNameEditCard from '@/components/card/nickname-edit-card';
import ProfileImageEditCard from '@/components/card/profileImage-edit-card';
import BottomUpModal from '@/components/modal/bottom-up-modal';
import { useControlTabBar } from '@/hooks/use-control-tarbar.tsx';
import { base, gray } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function Profile() {
  const [userNickName, setUserNickName] = useState<string>('');
  const [newNickname, onChangeNewNickname] = useState('');
  const [isNickNameModal, setIsNickNameModal] = useState(false);
  const [isNickNameChangeSaved, setIsNickNameChangeSaved] = useState(false);

  // 프로필 이미지 사진
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [isProfileImageModal, setIsProfileImageModal] = useState(false);

  const router = useRouter();
  // 모달이 열릴때 tabbar안보이게 하는 훅
  useControlTabBar(isNickNameModal || isProfileImageModal);

  const getMyInfo = async () => {
    const nickname = (await AsyncStorage.getItem('nickname')) ?? '';
    const profileImage = await AsyncStorage.getItem('profileImage');
    setUserNickName(nickname);
    setUserProfileImage(profileImage);
    onChangeNewNickname(nickname);
  };

  const handleRunningCourses = () => {
    router.push('/(tabs)/profile/running-courses');
  };

  const handleRecordedCourses = () => {
    router.push('/(tabs)/profile/recorded-courses');
  };

  const handleMyFavoriteCourses = () => {
    router.push('/(tabs)/profile/favorite-courses');
  };

  // 닉네임 모달 띄우기
  const handleEditNameModal = () => {
    setIsNickNameModal(!isNickNameModal);
  };

  // 프로필 이미지 모달 띄우기
  const handleEditProfileImageModal = () => {
    setIsProfileImageModal(!isProfileImageModal);
  };

  useEffect(() => {
    getMyInfo();
  }, [isNickNameChangeSaved]);

  return (
    <View style={styles.container}>
      <View style={styles.pictureSection}>
        <View>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                userProfileImage
                  ? { uri: userProfileImage }
                  : require('@/assets/images/user-profile.png')
              }
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <Pressable
            style={styles.cameraImageContainer}
            onPress={handleEditProfileImageModal}
          >
            <Image
              source={require('@/assets/images/camera.png')}
              width={35}
              height={35}
            />
          </Pressable>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userNickName}</Text>
          <Pressable onPress={handleEditNameModal}>
            <Image
              source={require('@/assets/images/mode.png')}
              width={35}
              height={35}
            />
          </Pressable>
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

        <Pressable
          style={styles.titleBarContainer}
          onPress={handleRecordedCourses}
        >
          <View style={styles.titleBar}>
            <Text style={styles.title}>내 기록</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#9CA3AF"
          />
        </Pressable>

        <Pressable
          style={styles.titleBarContainer}
          onPress={handleMyFavoriteCourses}
        >
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

      {isNickNameModal && !isProfileImageModal && (
        <BottomUpModal close={() => setIsNickNameModal(false)}>
          <NickNameEditCard
            newNickname={newNickname}
            onChangeNewNickname={onChangeNewNickname}
            setIsNickNameChangeSaved={setIsNickNameChangeSaved}
            setIsNickNameModal={setIsNickNameModal}
          />
        </BottomUpModal>
      )}
      {isProfileImageModal && (
        <BottomUpModal close={() => setIsProfileImageModal(false)}>
          <ProfileImageEditCard />
        </BottomUpModal>
      )}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: base['white'],
    flex: 1,
    position: 'relative',
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
    justifyContent: 'center',
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
    zIndex: 1,
  },

  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },

  cameraImageContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});
