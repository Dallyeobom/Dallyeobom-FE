import { userRanking } from '@/api/user/user.service';
import RankingButton from '@/components/button/ranking-button';
import RankingMyProfileCard from '@/components/card/ranking-my-profile-card';
import RankingRunnerItem from '@/components/item/ranking-runner-item';
import VerticalList from '@/components/list/verical-list';
import withRankingGuard from '@/components/wrapper/ranking-wrapper';
import { base, gray } from '@/styles/color';
import { RankingEnum } from '@/types/enum';
import { CurrentUserRank, RankingDataList } from '@/types/user';
import { mapRankingTextToEnum } from '@/utils/ranking';
import { showErrorAlert } from '@/utils/error-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const RANKING_OPTIONS: RankingEnum[] = ['WEEKLY', 'MONTHLY', 'YEARLY'];

function Ranking() {
  const [rankingStatus, setRankingStatus] = useState<RankingEnum>('WEEKLY');
  const [rankingList, setRankingList] = useState<RankingDataList[]>([]);
  const [currentUserRanking, setCurrentUserRanking] = useState<CurrentUserRank | null>(
    null,
  );

  const fetchRankingData = useCallback(async (status: string) => {
    try {
      const result = await userRanking(status);
      if (!result) {
        setRankingList([]);
        setCurrentUserRanking(null);
        return;
      }

      setRankingList(result.list);
      setCurrentUserRanking(result.currentUserRank);
    } catch (error) {
      showErrorAlert(error, 'RANKING', '랭킹 정보를 불러오는데 실패했습니다.');
      setRankingList([]);
      setCurrentUserRanking(null);
    }
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
      <RankingMyProfileCard currentUserRanking={currentUserRanking} />
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
