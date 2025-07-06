import { NearByRunneCourseItemSchema } from '@/types/item';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export const NearByRunnerCourseItem = ({
  id,
  imageUrl,
  profileImage,
  nickname,
  courseName,
}: NearByRunneCourseItemSchema) => {
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
        source={{ uri: imageUrl }}
        style={styles.courseImage}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
      <Text style={styles.courseName}>{courseName}</Text>
    </Pressable>
  );
};

export default NearByRunnerCourseItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginRight: 8,
    width: 192,
    rowGap: 6,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 124,
    borderRadius: 12,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  nickname: {
    fontSize: 14,
    color: '#666',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
