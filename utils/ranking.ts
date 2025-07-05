import { rankingEnum } from '@/types/enum';

export const mapRankingTextToEnum = (text: string) => {
  let rankingStatus;
  switch (text) {
    case 'weekly':
      rankingStatus = rankingEnum.enum.weekly;
      break;
    case 'monthly':
      rankingStatus = rankingEnum.enum.monthly;
      break;
    case 'yearly':
      rankingStatus = rankingEnum.enum.yearly;
      break;

    default:
      rankingStatus = rankingEnum.enum.weekly;
  }
  return rankingStatus;
};

export const convertRankingTextFromEngToKor = (text: string) => {
  let rankingText;
  switch (text) {
    case 'weekly':
      rankingText = '주간';
      break;
    case 'monthly':
      rankingText = '월간';
      break;
    case 'yearly':
      rankingText = '연간';
      break;
    default:
      rankingText = '주간';
  }
  return rankingText;
};
