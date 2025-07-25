import { PopularCoursesResponse } from '@/types/user';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export const PopularCourseItem = ({
  id,
  name,
  location,
  overViewImageUrl,
  length,
}: PopularCoursesResponse) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/course/${id}`);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        source={{ uri: overViewImageUrl }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <View style={styles.text}>
          <View>
            <Text style={styles.difficulty}>등산 난이도</Text>
            <Text style={styles.courseName}>{name}</Text>
          </View>
          <Text style={styles.distance}>{`${length}km`}</Text>
        </View>
        <Image source={require('@/assets/images/heart.png')} />
      </View>
    </Pressable>
  );
};

export default PopularCourseItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 16,
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
