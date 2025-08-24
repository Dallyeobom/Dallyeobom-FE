export const getDifficultyText = (level: string): string => {
  switch (level) {
    case 'LOW':
      return '쉬움';
    case 'MEDIUM':
      return '보통';
    case 'HIGH':
      return '어려움';
    default:
      return '보통';
  }
};
