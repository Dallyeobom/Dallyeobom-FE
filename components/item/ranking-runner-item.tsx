import { Image, StyleSheet, Text, View } from 'react-native';

interface RankingRunnerItemsProps {
  userId: number;
  nickname: string;
  profileImage?: string;
  completeCourseCount: number;
  runningLength: number;
}

export const RankingRunnerItem = ({
  userId,
  nickname,
  runningLength,
  profileImage,
  completeCourseCount,
}: RankingRunnerItemsProps) => (
  <View style={styles.container}>
    <View style={styles.rankContainer}>
      {/* <Text style={styles.rank}>{rank}</Text> */}
    </View>
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.nickName}>{nickname}</Text>
        <Text>{runningLength}KM</Text>
      </View>
    </View>
  </View>
);

export default RankingRunnerItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    columnGap: 20,
  },

  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 30,
  },
  rankContainer: {
    width: 22,
    height: 20,
  },
  rank: {
    fontWeight: 700,
    textAlign: 'center',
  },
  nickName: {
    fontWeight: 700,
  },
});
