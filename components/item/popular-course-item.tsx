import { courseLike } from '@/api/course/course.service';
import { PopularCoursesResponse } from '@/types/course';
import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseLevelBadge from '../badge/course-level-badge';

type PopularCourseItemProps = PopularCoursesResponse & {
  handleFetch: () => void;
};

function PopularCourseItem({
  id,
  isLiked,
  length,
  level,
  name,
  location,
  overViewImageUrl,
  handleFetch,
}: PopularCourseItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/course/${id}`);
  };

  const handleCourseLike = async (id: number) => {
    const result = await courseLike(id);
    if (!result) {
      Alert.alert('좋아요 반영에 실패하였습니다.');
      return;
    }
    handleFetch();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={styles.courseContainer}
      >
        <Image
          source={{ uri: overViewImageUrl }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <View style={styles.subCourseContainer}>
            <CourseLevelBadge level={level} />
            <Text style={styles.courseName}>{name}</Text>
          </View>
          <Text style={styles.distance}>{`${length}km`}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => handleCourseLike(id)}>
        <Image
          source={
            isLiked
              ? require('@/assets/images/heart-fill.png')
              : require('@/assets/images/heart.png')
          }
        />
      </Pressable>
    </View>
  );
}

export default PopularCourseItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  courseContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    flex: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  subCourseContainer: {
    display: 'flex',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  difficulty: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
