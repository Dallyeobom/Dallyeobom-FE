import { NearByRunneCourseItemSchema } from '@/types/item';
import { Image, StyleSheet, Text, View } from 'react-native';

export const NearByRunnerCourseItem = ({
  imageUrl,
  profileImage,
  nickname,
  courseName,
}: NearByRunneCourseItemSchema) => (
  <View style={styles.container}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.courseImage}
    />
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />
      <Text>{nickname}</Text>
    </View>
    <Text>{courseName}</Text>
  </View>
);

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
});
