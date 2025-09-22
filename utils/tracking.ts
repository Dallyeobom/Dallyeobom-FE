import { LocationType } from '@/app/tracking';

const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const haversineDistance = (coord1: LocationType, coord2: LocationType) => {
  const R = 6371;
  // 위도와 경도를 라디안으로 변환
  const lat1 = toRadians(coord1.latitude);
  const lon1 = toRadians(coord1.longitude);
  const lat2 = toRadians(coord2.latitude);
  const lon2 = toRadians(coord2.longitude);

  // 위도와 경도의 차이 계산
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine 공식을 이용한 거리 계산
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};

export const calculateTotalDistance = (coordsArray: LocationType[]) => {
  let totalDistance = 0;

  // 모든 연속된 좌표 쌍에 대해 거리 계산
  for (let i = 0; i < coordsArray.length - 1; i++) {
    totalDistance += haversineDistance(coordsArray[i], coordsArray[i + 1]);
  }

  return Number(totalDistance.toFixed(1));
};

export const getTodayDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    month,
    day,
  };
};

export const getDifficultyLevel = (level: string) => {
  let answer;
  switch (level) {
    case '어려움':
      answer = 'HIGH';
      break;
    case '보통':
      answer = 'MIDDLE';
      break;
    case '쉬움':
      answer = 'LOW';
      break;
    default:
      answer = 'LOW';
  }
  return answer;
};

export const returnFormatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${year}.${month}.${day}`;
};
