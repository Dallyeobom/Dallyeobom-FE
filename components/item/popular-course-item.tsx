import { PopularCourseItemSchema } from '@/types/item';
import { Image, StyleSheet, Text, View } from 'react-native';

export const PopularCourseItem = ({
  courseName,
  difficulty,
  distance,
  imageUrl,
}: PopularCourseItemSchema) => (
  <View style={styles.container}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <View style={styles.text}>
        <View>
          <Text>{difficulty}</Text>
          <Text>{courseName}</Text>
        </View>
        <Text>{distance}</Text>
      </View>
      <Image source={require('@/assets/images/heart.png')} />
    </View>
  </View>
);

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
