import { gray } from '@/styles/color';
import { CurrentUserRank } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MyProfileItem from '../item/my-profile-item';

interface RankingMyProfileCardProps {
  currentUserRanking: CurrentUserRank | null;
}

function RankingMyProfileCard({ currentUserRanking }: RankingMyProfileCardProps) {
  const [userNickName, setUserNickName] = useState<string>('');
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  const getMyInfo = async () => {
    const nickname = (await AsyncStorage.getItem('nickname')) ?? '';
    const profileImage = await AsyncStorage.getItem('profileImage');
    setUserNickName(nickname);
    setUserProfileImage(profileImage);
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <View style={styles.bottomCardWrapper}>
      <MyProfileItem
        userNickName={userNickName}
        userProfileImage={userProfileImage}
        currentUserRanking={currentUserRanking}
      />
    </View>
  );
}

export default RankingMyProfileCard;

const styles = StyleSheet.create({
  bottomCardWrapper: {
    height: 80,
    borderColor: gray[40],
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 2,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
});
