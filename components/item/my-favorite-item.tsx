import { courseLike } from '@/api/course/course.service';
import { FavoriteCourseItem } from '@/types/course';
import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import CourseLevelBadge from '../badge/course-level-badge';

type MyFavoriteItemProps = FavoriteCourseItem & {
  handleFetch: () => void;
};

function MyFavoriteItem({
  id,
  courseId,
  name,
  overViewImage,
  length,
  level,
  isLiked,
  handleFetch,
}: MyFavoriteItemProps) {
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
        style={styles.subContainer}
      >
        <Image
          source={{ uri: overViewImage }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <View>
              <CourseLevelBadge level={level} />
              <Text style={styles.courseName}>{name}</Text>
            </View>
            <Text style={styles.distance}>{`${length}km`}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable onPress={() => handleCourseLike(courseId)}>
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

export default MyFavoriteItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  subContainer: {
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
    flexDirection: 'row',
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
});
