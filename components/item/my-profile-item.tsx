import { gray } from '@/styles/color';
import { Image, StyleSheet, Text, View } from 'react-native';

interface MyProfileItemProps {
  data: any;
}
export const MyProfileItem = ({ data }: MyProfileItemProps) => (
  <View style={styles.container}>
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: data.profileImage }}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.nickName}>{data.nickname}</Text>
        <Text style={styles.disatance}>{data.distance}</Text>
      </View>
    </View>
    <View style={styles.badge}>
      <Text style={styles.rank}>{data.rank}등</Text>
    </View>
  </View>
);
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
  disatance: {
    fontWeight: 700,
  },
});
