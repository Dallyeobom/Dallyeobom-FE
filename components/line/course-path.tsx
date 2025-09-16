import { LocationType } from '@/app/tracking';
import { Polyline } from 'react-native-maps';

function CoursePath() {
  const renderPolyLine = (coordinates: LocationType[]) => {
    if (coordinates.length < 2) return null;
    const total = coordinates.length;
    const splitIndex = Math.floor(total * 0.54);
    const firstHalf = coordinates.slice(0, splitIndex + 1);
    const secondHalf = coordinates.slice(splitIndex);
    return (
      <>
        <Polyline
          coordinates={firstHalf}
          strokeColor="#7028FF"
          strokeWidth={6}
        />
        <Polyline
          coordinates={secondHalf}
          strokeColor="#E0007F"
          strokeWidth={6}
        />
      </>
    );
  };
  return renderPolyLine;
}

export default CoursePath;
