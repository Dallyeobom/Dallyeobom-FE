import { userRanking } from '@/api/user/user.service';
import RankingButton from '@/components/button/ranking-button';
import MyProfileItem from '@/components/item/my-profile-item';
import RankingRunnerItem from '@/components/item/ranking-runner-item';
import VerticalList from '@/components/list/verical-list';
import withRankingGuard from '@/components/wrapper/ranking-wrapper';
import { base, gray } from '@/styles/color';
import { RankingEnum } from '@/types/enum';
import { CurrentUserRank, RankingDataList } from '@/types/user';
import { mapRankingTextToEnum } from '@/utils/ranking';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RANKING_OPTIONS: RankingEnum[] = ['WEEKLY', 'MONTHLY', 'YEARLY'];

function Ranking() {
  const [rankingStatus, setRankingStatus] = useState<RankingEnum>('WEEKLY');
  const [rankingList, setRankingList] = useState<RankingDataList[]>([]);
  const [currentUserRanking, setCurrentUserRanking] = useState<CurrentUserRank | null>(
    null,
  );

  const fetchRankingData = useCallback(async (status: string) => {
    const result = await userRanking(status);
    if (!result) {
      setRankingList([]);
      setCurrentUserRanking(null);
      return;
    }

    setRankingList(result.list);
    setCurrentUserRanking(result.currentUserRank);
  }, []);

  const handleSelect = useCallback(
    async (text: string) => {
      const rankingStatusResult = mapRankingTextToEnum(text);
      setRankingStatus(rankingStatusResult);
      await fetchRankingData(text);
    },
    [fetchRankingData],
  );

  useEffect(() => {
    fetchRankingData(rankingStatus);
  }, [fetchRankingData, rankingStatus]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.menuContainer}>
          <View style={styles.submenuContainer}>
            {RANKING_OPTIONS.map((option) => (
              <RankingButton
                key={option}
                rankingStatus={option}
                handleSelect={handleSelect}
                isSelected={rankingStatus === option}
              />
            ))}
          </View>
        </View>
        <View style={styles.dataContainer}>
          <VerticalList
            data={rankingList}
            renderItem={RankingRunnerItem}
          />
        </View>
      </View>

      <View style={styles.bottomCardWrapper}>
        {currentUserRanking ? (
          <MyProfileItem data={currentUserRanking} />
        ) : (
          // TODO: 추후에 UI나오면은 넣을 예정
          <Text>기록이없습니다.</Text>
        )}
      </View>
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
