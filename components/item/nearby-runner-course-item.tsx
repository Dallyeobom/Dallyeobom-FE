import { NearUserCoursesResponse } from '@/types/user';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export const NearByRunnerCourseItem = ({
  id,
  name,
  courseImage,
  user,
}: NearUserCoursesResponse) => {
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
        source={{ uri: courseImage }}
        style={styles.courseImage}
      />
      <View style={styles.profileContainer}>
        {/* TODO: 추후 프로필 이미지가 들어오면은 넣어주기*/}
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{user.nickname}</Text>
      </View>
      <Text style={styles.courseName}>{name}</Text>
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
