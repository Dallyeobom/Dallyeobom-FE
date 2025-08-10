import { gray } from '@/styles/color';
import { CurrentUserRank } from '@/types/user';
import { Image, StyleSheet, Text, View } from 'react-native';

interface MyProfileItemProps {
  userNickName: string;
  userProfileImage: string | null;
  currentUserRanking: CurrentUserRank | null;
}

function MyProfileItem({
  userNickName,
  userProfileImage,
  currentUserRanking,
}: MyProfileItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={
            userProfileImage
              ? { uri: userProfileImage }
              : require('@/assets/images/user-profile.png')
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.nickName}>{userNickName}</Text>
          {/* TODO: runningLength가 없을떄 표시  */}
          <Text style={styles.distance}>{currentUserRanking?.runningLength}KM</Text>
        </View>
      </View>
      {/* TODO: rank가 없을떄 표시  */}
      <View style={styles.badge}>
        <Text style={styles.rank}>{currentUserRanking?.rank}등</Text>
      </View>
    </View>
  );
}
export default MyProfileItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 16,

    flex: 1,
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
  badge: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: gray[10],
    borderRadius: 8,
  },
  rank: {
    color: gray[80],
    textAlign: 'center',
  },
  nickName: {
    color: gray[40],
  },
  distance: {
    fontWeight: '700',
  },
});
