import RankingButton from '@/components/button/ranking-button';
import RankingRunnerItem from '@/components/item/ranking-runner-item';
import VerticalList from '@/components/list/verical-list';
import withRankingGuard from '@/components/wrapper/ranking-wrapper';
import { monthlyRunnerData, weeklyRunnerData, yearlyRunnerData } from '@/mocks/data';
import { base, gray } from '@/styles/color';
import { RankingEnum } from '@/types/enum';
import { convertRankingEnumFromKoreanToEng } from '@/utils/ranking';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Ranking
function Ranking() {
  const [rankingStatus, setRankingStatus] = useState<RankingEnum>('weekly');
  const handleSelect = (text: string) => {
    const result = convertRankingEnumFromKoreanToEng(text);
    setRankingStatus(result);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.menuContainer}>
          <View style={styles.submenuContainer}>
            <RankingButton
              rankingStatus="weekly"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'weekly'}
            />
            <RankingButton
              rankingStatus="monthly"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'monthly'}
            />

            <RankingButton
              rankingStatus="yearly"
              handleSelect={handleSelect}
              isSelected={rankingStatus === 'yearly'}
            />
          </View>
        </View>
        <View style={styles.dataContainer}>
          {rankingStatus === 'weekly' ? (
            <VerticalList
              data={weeklyRunnerData}
              renderItem={RankingRunnerItem}
            />
          ) : rankingStatus === 'monthly' ? (
            <VerticalList
              data={monthlyRunnerData}
              renderItem={RankingRunnerItem}
            />
          ) : (
            <VerticalList
              data={yearlyRunnerData}
              renderItem={RankingRunnerItem}
            />
          )}
        </View>
      </View>
      <View style={styles.bottomCard}>
        <RankingRunnerItem />
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
  bottomCard: {
    height: 80,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'blue',
  },
});
