import { getCourseImages } from '@/api/course/course.service';
import ImageViewerModal from '@/components/modal/image-viewer-modal';
import { base, gray } from '@/styles/color';
import type { CourseImagesResponse } from '@/types/course';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CoursePhotosScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [courseImages, setCourseImages] = useState<CourseImagesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  useEffect(() => {
    const fetchCourseImages = async () => {
      if (!id || Array.isArray(id)) return;

      setIsLoading(true);
      setError(null);

      try {
        const courseId = parseInt(id, 10);
        if (isNaN(courseId)) {
          setError('유효하지 않은 코스 ID입니다.');
          return;
        }

        const imagesData = await getCourseImages(courseId);
        setCourseImages(imagesData);
      } catch {
        setError('코스 이미지를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseImages();
  }, [id]);

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageViewerVisible(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerVisible(false);
    setSelectedImage(null);
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
      <Text style={styles.headerTitle}>코스 사진</Text>
      <View style={styles.placeholder} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={gray[40]}
          />
          <Text style={styles.loadingText}>사진을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!courseImages || !courseImages.items || courseImages.items.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>등록된 사진이 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photosGrid}>
          {courseImages.items.map((imageUrl, index) => (
            <Pressable
              key={`image-${index}`}
              onPress={() => handleImagePress(imageUrl)}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.photoItem}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

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
    borderBottomWidth: 1,
    borderBottomColor: gray[15],
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: gray[100],
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoItem: {
    width: (width - 48) / 3,
    height: (width - 48) / 3,
    borderRadius: 8,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: gray[40],
    textAlign: 'center',
  },
});
