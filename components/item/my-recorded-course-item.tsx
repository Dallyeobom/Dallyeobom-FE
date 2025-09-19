import { gray } from '@/styles/color';
import { RecordedCourseHistoryItem } from '@/types/course-complete';
import { returnFormatDate } from '@/utils/tracking';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PinIcon } from '../icons/TrackingIcon';
import CoursePath from '../line/course-path';

type MyRecordedCourseItemProps = RecordedCourseHistoryItem & {
  handleFetch: () => void;
};

function MyRecordedCourseItem({
  id,
  courseId,
  title,
  interval,
  length,
  completeDate,
  path,
}: MyRecordedCourseItemProps) {
  const renderPolyLine = CoursePath();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: path[0].latitude,
            longitude: path[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={path[0]}
            title="Start"
          />
          <Marker
            coordinate={path[path.length - 1]}
            title="End"
          >
            <PinIcon
              width={35}
              height={35}
            />
          </Marker>

          {renderPolyLine(path)}
        </MapView>
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{returnFormatDate(completeDate)}</Text>
        <Text style={styles.distance}>{length}km</Text>
      </View>
    </View>
  );
}

export default MyRecordedCourseItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    rowGap: 14,
    marginBottom: 14,
  },
  mapContainer: {
    borderRadius: 20,
    width: '100%',
    height: 160,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 10,
  },

  title: {
    fontWeight: '400',
    marginBottom: 2,
  },
  date: {
    color: gray[30],
    marginBottom: 4,
  },
  distance: {
    fontSize: 20,
    fontWeight: '700',
  },
});
