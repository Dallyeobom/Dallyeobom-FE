import { gray } from '@/styles/color';
import { Image, StyleSheet, Text, View } from 'react-native';
import { renderRankIcon } from './rank-icon';

interface RankingRunnerItemsProps {
  userId: number;
  nickname: string;
  profileImage?: string;
  completeCourseCount: number;
  runningLength: number;
  index: number;
}

export const RankingRunnerItem = ({
  userId,
  nickname,
  runningLength,
  profileImage,
  completeCourseCount,
  index,
}: RankingRunnerItemsProps) => (
  <View style={styles.container}>
    <View>{renderRankIcon(index)}</View>
    <View style={styles.profileContainer}>
      {/* TODO: 추후에 데이터 프로필 이미지 url 속성이 추가 된다면 넣을예정 */}
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.nickName}>{nickname}</Text>
        <Text style={styles.runningLength}>{runningLength} km</Text>
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

  rank: {
    fontWeight: 700,
    textAlign: 'center',
  },
  nickName: {
    fontWeight: 700,
  },
  runningLength: {
    color: gray[40],
  },
});
