import {
  courseDetail,
  courseLike,
  getCourseImages,
  getCourseRank,
  getCourseReview,
} from '@/api/course/course.service';
import NoDataItem from '@/components/item/no-data-item';
import ImageViewerModal from '@/components/modal/image-viewer-modal';
import { base, gray, main } from '@/styles/color';
import type {
  CourseDetailResponse,
  CourseImagesResponse,
  CourseRankResponse,
  CourseReviewResponse,
} from '@/types/course';
import { getDifficultyText } from '@/utils/difficulty';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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

const { height, width } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(null);
  const [courseImages, setCourseImages] = useState<CourseImagesResponse | null>(null);
  const [courseRanking, setCourseRanking] = useState<CourseRankResponse | null>(null);
  const [courseReviews, setCourseReviews] = useState<CourseReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const bottomSheetHeight = height;
  const minBottomSheetHeight = height * 0.45;
  const translateY = useRef(
    new Animated.Value(bottomSheetHeight - minBottomSheetHeight),
  ).current;
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchCourseData = useCallback(async () => {
    if (!id || Array.isArray(id)) return;

    setIsLoading(true);
    setError(null);

    try {
      const courseId = parseInt(id, 10);
      if (isNaN(courseId)) {
        setError('유효하지 않은 코스 ID입니다.');
        return;
      }

      const data = await courseDetail(courseId);
      if (data) {
        setCourseData(data);

        const [imagesData, rankingData, reviewsData] = await Promise.all([
          getCourseImages(courseId),
          getCourseRank(courseId),
          getCourseReview(courseId),
        ]);

        setCourseImages(imagesData);
        setCourseRanking(rankingData);
        setCourseReviews(reviewsData);
      } else {
        setError('코스 정보를 불러올 수 없습니다.');
      }
    } catch {
      setError('코스 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData, id]);

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

  const formatDistance = (lengthInMeters: number) => {
    if (lengthInMeters >= 1000) {
      return `${(lengthInMeters / 1000).toFixed(1)}km`;
    }
    return `${lengthInMeters}m`;
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

  const renderCourseInfo = () => {
    if (!courseData) return null;

    return (
      <View
        style={styles.courseInfoContainer}
        {...panResponder.panHandlers}
      >
        <View style={styles.courseInfoHeader}>
          <View style={[styles.difficultyBadge, getDifficultyBadgeStyle(courseData.courseLevel)]}>
            <Text style={[styles.difficulty, getDifficultyTextStyle(courseData.courseLevel)]}>
              {getDifficultyText(courseData.courseLevel)}
            </Text>
          </View>
          <Text style={styles.courseTitle}>{courseData.name}</Text>
          <Text style={styles.courseDescription}>{courseData.description}</Text>
          <Text style={styles.distance}>{formatDistance(courseData.length)}</Text>
        </View>
      </View>
    );
  };

  const renderRankIcon = (index: number) => {
    if (index < 3) {
      const trophyColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
      return (
        <View style={styles.userRankNumber}>
          <Ionicons
            name="trophy"
            size={24}
            color={trophyColors[index]}
          />
        </View>
      );
    }
    return (
      <View style={styles.userRankNumber}>
        <Text style={styles.rankNumberText}>{index + 1}</Text>
      </View>
    );
  };

  const formatTime = (intervalMs: number) => {
    const seconds = Math.floor(intervalMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const handleLikeToggle = async () => {
    if (!courseData || !id || Array.isArray(id)) return;

    const courseId = parseInt(id, 10);
    if (isNaN(courseId)) return;

    const previousLikeState = courseData.isLiked;
    setCourseData((prev) => (prev ? { ...prev, isLiked: !prev.isLiked } : null));

    try {
      await courseLike(courseId);
    } catch (error) {
      setCourseData((prev) => (prev ? { ...prev, isLiked: previousLikeState } : null));
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageViewerVisible(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerVisible(false);
    setSelectedImage(null);
  };

  const getDifficultyTextStyle = (level: string) => {
    switch (level) {
      case 'LOW':
        return { color: '#0095FF' };
      case 'MEDIUM':
        return { color: '#00C321' };
      case 'HIGH':
        return { color: '#FF0000' };
      default:
        return { color: '#0095FF' };
    }
  };

  const getDifficultyBadgeStyle = (level: string) => {
    switch (level) {
      case 'LOW':
        return { backgroundColor: 'rgba(0, 149, 255, 0.08)' };
      case 'MEDIUM':
        return { backgroundColor: 'rgba(0, 195, 33, 0.08)' };
      case 'HIGH':
        return { backgroundColor: 'rgba(255, 0, 0, 0.08)' };
      default:
        return { backgroundColor: 'rgba(0, 149, 255, 0.08)' };
    }
  };

  const renderCompletedUsers = () => {
    if (!courseRanking || !courseRanking.items || courseRanking.items.length === 0) {
      return (
        <View style={[styles.noDataCourseContainer]}>
          <NoDataItem source={require('@/assets/images/priority-high.png')} />
          <Text style={styles.noDataText}>이 코스를 완주하고 랭킹에 도전하세요</Text>
          <Pressable style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>이 코스로 달리기</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.completedUsersContainer}>
        <Text style={styles.sectionTitle}>이 코스를 완주한 유저</Text>
        {courseRanking.items.map((rankItem, index) => (
          <View
            key={rankItem.user.id}
            style={styles.userItem}
          >
            {renderRankIcon(index)}
            <Image
              source={{
                uri:
                  rankItem.user.profileImage ||
                  'https://randomuser.me/api/portraits/men/1.jpg',
              }}
              style={styles.userAvatar}
            />
            <View style={styles.userInfo}>
              <Text
                style={styles.userName}
                numberOfLines={1}
              >
                {rankItem.user.nickname}
              </Text>
            </View>
            <Text style={[styles.userTime, index < 3 && styles.userTimeBold]}>
              {formatTime(rankItem.interval)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPhotos = () => {
    const reviewCount = courseReviews?.items?.length || 0;

    if (!courseImages || !courseImages.items || courseImages.items.length === 0) {
      return (
        <View style={styles.photosContainer}>
          <Text style={styles.sectionTitle}>리뷰 ({reviewCount})</Text>
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>등록된 사진이 없습니다.</Text>
          </View>
          {renderReviewList()}
        </View>
      );
    }

    const photoSize = (width - 64) / 4;
    const displayImages = courseImages.items.slice(0, 4);

    return (
      <View style={styles.photosContainer}>
        <Text style={styles.sectionTitle}>리뷰 ({reviewCount})</Text>
        <View style={styles.photosGrid}>
          {displayImages.map((imageUrl, index) => (
            <View
              key={imageUrl}
              style={[styles.photoItemContainer, { width: photoSize, height: photoSize }]}
            >
              <Pressable
                onPress={() => handleImagePress(imageUrl)}
                style={styles.photoItem}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.photoItemImage}
                />
              </Pressable>
              {index === 3 && courseImages.items.length > 4 && (
                <Pressable
                  style={styles.photoOverlay}
                  onPress={() => {
                    router.push(`/course/${id}/photos`);
                  }}
                >
                  <Text style={styles.photoOverlayText}>+ 더보기</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
        {renderReviewList()}
      </View>
    );
  };

  const renderReviewList = () => {
    if (!courseReviews || !courseReviews.items || courseReviews.items.length === 0) {
      return null;
    }

    // 최대 3개의 리뷰만 미리보기로 표시
    const displayReviews = courseReviews.items.slice(0, 3);

    return (
      <View style={styles.reviewListContainer}>
        {displayReviews.map((review, index) => (
          <View key={review.id}>
            <View style={styles.reviewItemContainer}>
              {review.completionImages && review.completionImages.length > 0 && (
                <View style={styles.reviewImageContainer}>
                  <Image
                    source={{ uri: review.completionImages[0] }}
                    style={styles.reviewPreviewImage}
                  />
                </View>
              )}
              <View
                style={[
                  styles.reviewContentContainer,
                  !(review.completionImages && review.completionImages.length > 0) &&
                    styles.reviewContentContainerNoImage,
                ]}
              >
                <Text
                  style={styles.reviewPreviewText}
                  numberOfLines={
                    review.completionImages && review.completionImages.length > 0 ? 3 : 2
                  }
                >
                  {review.review}
                </Text>
                <Text style={styles.reviewPreviewDate}>{review.createdAt}</Text>
              </View>
            </View>
            {index < displayReviews.length - 1 && <View style={styles.reviewDivider} />}
          </View>
        ))}
        {courseReviews.items.length > 3 && (
          <Pressable style={styles.moreReviewsButton}>
            <Text style={styles.moreReviewsText}>리뷰 더보기</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={main[80]}
      />
      <Text style={styles.loadingText}>코스 정보를 불러오는 중...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Pressable
        style={styles.retryButton}
        onPress={fetchCourseData}
      >
        <Text style={styles.retryButtonText}>다시 시도</Text>
      </Pressable>
    </View>
  );

  const renderFloatingButton = () => (
    <View style={styles.floatingButtonContainer}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
        style={styles.floatingButtonBackground}
      />
      <View style={styles.floatingButtonRow}>
        <Pressable
          style={styles.heartButton}
          onPress={handleLikeToggle}
        >
          <Ionicons
            name={courseData?.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={courseData?.isLiked ? '#FF4B6A' : gray[40]}
          />
        </Pressable>
        <Pressable style={styles.floatingButton}>
          <View style={styles.floatingButtonSolid}>
            <Image
              source={require('@/assets/images/runner.png')}
              style={styles.runningIcon}
            />
            <Text style={styles.floatingButtonText}>이 코스로 달리기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderLoadingState()}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderErrorState()}
      </View>
    );
  }

  if (!courseData) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>코스 정보를 찾을 수 없습니다.</Text>
        </View>
      </View>
    );
  }

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

      <ImageViewerModal
        visible={isImageViewerVisible}
        imageUrl={selectedImage || ''}
        onClose={handleCloseImageViewer}
      />
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficulty: {
    fontSize: 14,
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
  },
  photoItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoItemImage: {
    width: '100%',
    height: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: gray[40],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: gray[40],
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: main[80],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: base.white,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContent: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: gray[40],
    textAlign: 'center',
  },
  noDataCourseContainer: {
    marginVertical: 85,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  noDataText: {
    color: gray[30],
    fontSize: 13,
  },
  challengeButton: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: gray[15],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: base.white,
    marginTop: 12,
  },
  challengeButtonText: {
    fontSize: 14,
    color: gray[80],
    fontWeight: '500',
  },
  reviewListContainer: {
    marginTop: 20,
  },
  reviewItemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  reviewImageContainer: {
    marginRight: 12,
  },
  reviewPreviewImage: {
    width: 84,
    height: 84,
    borderRadius: 8,
  },
  reviewContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 84,
  },
  reviewContentContainerNoImage: {
    justifyContent: 'center',
    height: 'auto',
  },
  reviewPreviewText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#121212',
    marginBottom: 4,
  },
  reviewPreviewDate: {
    fontSize: 13,
    fontWeight: '400',
    color: gray[30],
  },
  reviewDivider: {
    height: 1,
    backgroundColor: gray[15],
    marginHorizontal: 0,
  },
  moreReviewsButton: {
    marginTop: 20,
    width: 320,
    height: 48,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  moreReviewsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});
