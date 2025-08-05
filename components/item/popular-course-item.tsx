import { courseLike } from '@/api/course/course.service';
import { PopularCoursesResponse } from '@/types/course';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseLevelBadge from '../badge/course-level-badge';

type PopularCourseItemProps = PopularCoursesResponse & {
  index: number;
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
    await courseLike(id);
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
          <View>
            <Text style={styles.difficulty}>
              <CourseLevelBadge level={level} />
            </Text>
            <Text style={styles.courseName}>{name}</Text>
          </View>
          <Text style={styles.distance}>{`${length}km`}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => handleCourseLike(id)}
        style={styles.heartImage}
      >
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
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  heartImage: {
    // flex: 1,
  },
});
