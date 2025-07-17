import { rankingEnum } from '@/types/enum';

export const mapRankingTextToEnum = (text: string) => {
  let rankingStatus;
  switch (text) {
    case 'WEEKLY':
      rankingStatus = rankingEnum.enum.WEEKLY;
      break;
    case 'MONTHLY':
      rankingStatus = rankingEnum.enum.MONTHLY;
      break;
    case 'YEARLY':
      rankingStatus = rankingEnum.enum.YEARLY;
      break;

    default:
      rankingStatus = rankingEnum.enum.YEARLY;
  }
  return rankingStatus;
};

export const convertRankingTextFromEngToKor = (text: string) => {
  let rankingText;
  switch (text) {
    case 'WEEKLY':
      rankingText = '주간';
      break;
    case 'MONTHLY':
      rankingText = '월간';
      break;
    case 'YEARLY':
      rankingText = '연간';
      break;
    default:
      rankingText = '주간';
  }
  return rankingText;
};
