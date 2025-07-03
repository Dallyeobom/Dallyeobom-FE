import { gray } from '@/styles/color';
import { convertRankingTextFromEngToKor } from '@/utils/ranking';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface RankingButtonProps {
  rankingStatus: string;
  handleSelect: (text: string) => void;
  isSelected: boolean;
}

function RankingButton({ rankingStatus, handleSelect, isSelected }: RankingButtonProps) {
  return (
    <Pressable
      style={[styles.menuButton, isSelected && styles.menuButtonSelected]}
      onPress={() => handleSelect(rankingStatus)}
    >
      <Text style={[styles.menu, rankingStatus && styles.textSelected]}>
        {convertRankingTextFromEngToKor(rankingStatus)}
      </Text>
    </Pressable>
  );
}

export default RankingButton;

const styles = StyleSheet.create({
  menuButton: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 16,
    display: 'flex',
    alignItems: 'center',
  },
  menuButtonSelected: {
    borderBottomWidth: 1,
    borderBottomColor: gray[100],
    color: gray[100],
  },

  menu: {
    fontSize: 16,
    fontWeight: 600,
    color: gray[30],
  },
  textSelected: {
    color: gray[100],
    fontWeight: 700,
  },
});
