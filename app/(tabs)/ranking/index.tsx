import RankingButton from '@/components/button/ranking-button';
import RankingRunnerItem from '@/components/item/ranking-runner-item';
import VerticalList from '@/components/list/verical-list';
import withRankingGuard from '@/components/wrapper/ranking-wrapper';
import { useUserStore } from '@/stores/user-store';
import { base, gray } from '@/styles/color';
import { RankingDataList } from '@/types/auth';
import { RankingEnum } from '@/types/enum';
import { mapRankingTextToEnum } from '@/utils/ranking';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function Ranking() {
  const userRanking = useUserStore((state) => state.userRanking);

  const [rankingStatus, setRankingStatus] = useState<RankingEnum>('WEEKLY');
  const [rankingList, setRankingList] = useState<RankingDataList[] | []>([]);
  const handleSelect = async (text: string) => {
    console.log('typed을 바꾸자', rankingStatus);
    const result = mapRankingTextToEnum(text);
    setRankingStatus(result);
    const result2 = await userRanking(rankingStatus); // currentUserRank, list

    if (!result2) {
      setRankingList([]);
      return;
    }
    setRankingList(result2.list);
  };
  console.log('rankingList', rankingList, 'rankingStatus', rankingStatus);

  useEffect(() => {
    (async () => {
      const result2 = await userRanking(rankingStatus);

      if (!result2) {
        setRankingList([]);
        return;
      }
      setRankingList(result2.list);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.menuContainer}>
          <View style={styles.submenuContainer}>
            <RankingButton
              rankingStatus="WEEKLY"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'WEEKLY'}
            />
            <RankingButton
              rankingStatus="MONTHLY"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'MONTHLY'}
            />

            <RankingButton
              rankingStatus="YEARLY"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'YEARLY'}
            />
          </View>
        </View>
        <View style={styles.dataContainer}>
          <VerticalList
            data={rankingList}
            renderItem={RankingRunnerItem}
          />
        </View>
      </View>
      {/* .
      <View style={styles.bottomCardWrapper}>
        <MyProfileItem data={MyData} />
      </View> */}
    </View>
  );
}

export default withRankingGuard(Ranking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: base['white'],
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: base['white'],
    borderBottomColor: gray[15],
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  submenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '94%',
  },
  dataContainer: {
    width: '94%',
    alignSelf: 'center',
  },
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
