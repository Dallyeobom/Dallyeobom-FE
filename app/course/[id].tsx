import { renderRankIcon } from '@/components/item/rank-icon';
import { base, gray, main } from '@/styles/color';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const bottomSheetHeight = height;
  const minBottomSheetHeight = height * 0.45; // 펼치기 전 화면 높이 45%
  const translateY = useRef(
    new Animated.Value(bottomSheetHeight - minBottomSheetHeight),
  ).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        (translateY as any).setOffset((translateY as any)._value);
      },
      onPanResponderMove: (_event, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_event, gestureState) => {
        (translateY as any).flattenOffset();

        const { dy, vy } = gestureState;
        let finalPosition;

        if (vy > 0.5 || (!isExpanded && dy > 50)) {
          finalPosition = bottomSheetHeight - minBottomSheetHeight;
          setIsExpanded(false);
        } else if (vy < -0.5 || (isExpanded && dy < -50)) {
          finalPosition = 0;
          setIsExpanded(true);
        } else {
          finalPosition = isExpanded ? 0 : bottomSheetHeight - minBottomSheetHeight;
        }

        Animated.spring(translateY, {
          toValue: finalPosition,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      },
    }),
  ).current;

  // TODO: 임시 데이터 - 실제로는 API에서 가져올 데이터
  const courseData = {
    id: id,
    title: '영등대교 - 청담대교',
    description: '영등대교에서 청담대교까지 이어지는 코스입니다.',
    distance: '10.2km',
    difficulty: '어려움',
    completedUsers: [
      { id: 1, nickname: '오늘도 화이팅', time: '1시간 30분' },
      { id: 2, nickname: '오늘도 화이팅', time: '1시간 30분' },
      { id: 3, nickname: '오늘도화이팅오늘도화이팅', time: '1시간 30분' },
      { id: 4, nickname: '오늘도 화이팅', time: '1시간 40분' },
      { id: 5, nickname: '오늘도 화이팅', time: '1시간 40분' },
    ],
    photos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/seed/course${i + 1}/400/300`,
    })),
  };

  const toggleBottomSheet = () => {
    const targetValue = isExpanded ? bottomSheetHeight - minBottomSheetHeight : 0;
    setIsExpanded(!isExpanded);

    Animated.spring(translateY, {
      toValue: targetValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const renderHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={gray[100]}
        />
      </Pressable>
      <Text style={styles.headerTitle}>코스 정보</Text>
      <View style={styles.headerRight} />
    </View>
  );

  const renderExpandedHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Pressable
        style={styles.backButton}
        onPress={toggleBottomSheet}
      >
        <Ionicons
          name="chevron-down"
          size={24}
          color={gray[100]}
        />
      </Pressable>
      <View style={styles.headerRight} />
    </View>
  );

  const renderMapSection = () => (
    <View style={[styles.mapContainer, { height: height * 0.55 }]}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>지도 영역</Text>
      </View>
    </View>
  );

  const renderBottomSheetHandle = () => (
    <View
      style={styles.bottomSheetHandle}
      {...panResponder.panHandlers}
    >
      <View style={styles.handleBar} />
    </View>
  );

  const renderCourseInfo = () => (
    <View
      style={styles.courseInfoContainer}
      {...panResponder.panHandlers}
    >
      <View style={styles.courseInfoHeader}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficulty}>{courseData.difficulty}</Text>
        </View>
        <Text style={styles.courseTitle}>{courseData.title}</Text>
        <Text style={styles.courseDescription}>{courseData.description}</Text>
        <Text style={styles.distance}>{courseData.distance}</Text>
      </View>
    </View>
  );

  const renderCompletedUsers = () => (
    <View style={styles.completedUsersContainer}>
      <Text style={styles.sectionTitle}>이 코스를 완주한 유저</Text>
      {courseData.completedUsers.map((user, index) => (
        <View
          key={user.id}
          style={styles.userItem}
        >
          {renderRankIcon(index)}
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
              numberOfLines={1}
            >
              {user.nickname}
            </Text>
          </View>
          <Text style={[styles.userTime, index < 3 && styles.userTimeBold]}>
            {user.time}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderPhotos = () => {
    const photoSize = (width - 64) / 4; // 20px padding * 2 + 8px gap * 3 = 64px

    return (
      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>코스 사진</Text>
        <View style={styles.photosGrid}>
          {courseData.photos.slice(0, 4).map((photo, index) => (
            <Pressable
              key={photo.id}
              style={styles.photoItemContainer}
              onPress={() => {
                if (index === 3 && courseData.photos.length > 4) {
                  router.push(`/course/${id}/photos`);
                }
              }}
            >
              <Image
                source={{ uri: photo.url }}
                style={[styles.photoItem, { width: photoSize, height: photoSize }]}
              />
              {index === 3 && courseData.photos.length > 4 && (
                <View style={styles.photoOverlay}>
                  <Text style={styles.photoOverlayText}>+ 더보기</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const renderFloatingButton = () => (
    <View style={styles.floatingButtonContainer}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
        style={styles.floatingButtonBackground}
      />
      <View style={styles.floatingButtonRow}>
        <Pressable style={styles.heartButton}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={gray[40]}
          />
        </Pressable>
        <Pressable style={styles.floatingButton}>
          <View style={styles.floatingButtonSolid}>
            <Image
              source={require('@/assets/images/running-man.png')}
              style={styles.runningIcon}
            />
            <Text style={styles.floatingButtonText}>이 코스로 달리기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isExpanded && renderHeader()}
      {!isExpanded && renderMapSection()}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        {isExpanded && renderExpandedHeader()}
        {!isExpanded && renderBottomSheetHandle()}
        {renderCourseInfo()}
        <ScrollView
          style={styles.tabContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={isExpanded}
        >
          {renderCompletedUsers()}
          {renderPhotos()}
        </ScrollView>
      </Animated.View>

      {renderFloatingButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: base.white,
    zIndex: 1000,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: gray[100],
  },
  headerRight: {
    width: 40,
  },
  mapContainer: {
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: gray[15],
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: gray[40],
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: base.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetHandle: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  handleBar: {
    width: 44,
    height: 4,
    backgroundColor: gray[15],
    borderRadius: 2,
  },
  courseInfoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  courseInfoHeader: {
    gap: 8,
    borderBottomColor: gray[15],
    borderBottomWidth: 1,
    paddingBottom: 32,
  },
  difficultyBadge: {
    backgroundColor: '#FF000014',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficulty: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: gray[100],
  },
  courseDescription: {
    fontSize: 14,
    color: gray[40],
    lineHeight: 20,
  },
  distance: {
    fontSize: 20,
    fontWeight: '700',
    color: gray[100],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: base.white,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: gray[15],
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: main[80],
  },
  tabText: {
    fontSize: 16,
    color: gray[40],
  },
  activeTabText: {
    color: main[80],
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  completedUsersContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  trophyIcon: {
    width: 24,
    height: 24,
  },
  userRankNumber: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: gray[100],
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '400',
    color: gray[80],
  },
  userTime: {
    fontSize: 15,
    color: gray[100],
  },
  userTimeBold: {
    fontWeight: '700',
  },
  photosContainer: {
    padding: 20,
    paddingBottom: 130,
  },
  photosGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  photoItemContainer: {
    position: 'relative',
    flex: 1,
  },
  photoItem: {
    borderRadius: 8,
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoOverlayText: {
    color: base.white,
    fontSize: 15,
    fontWeight: '700',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    paddingBottom: 34,
    paddingHorizontal: 16,
  },
  floatingButtonBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  floatingButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  heartButton: {
    width: 60,
    height: 56,
    borderRadius: 16,
    backgroundColor: base.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingButton: {
    width: 280,
    height: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonSolid: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: main[80],
    borderRadius: 16,
    gap: 8,
  },
  runningIcon: {
    width: 21,
    height: 22,
  },
  floatingButtonText: {
    marginLeft: 8,
    color: base.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
