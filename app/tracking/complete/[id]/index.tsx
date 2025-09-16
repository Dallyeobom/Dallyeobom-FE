import { courseDetail, getCourseRank } from '@/api/course/course.service';
import CourseInfoCard from '@/components/card/course-info-card';
import { PinIcon } from '@/components/icons/TrackingIcon';
import CoursePath from '@/components/line/course-path';
import LoadingSpinner from '@/components/loading';
import { gray } from '@/styles/color';
import { CourseDetailResponse, CourseRankResponse } from '@/types/course';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

function Index() {
  const { id } = useLocalSearchParams();
  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(null);
  const [courseRanking, setCourseRanking] = useState<CourseRankResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getCompleteCourseDetail = async (id: string) => {
    const [courseDetailData, courseRankData] = await Promise.all([
      courseDetail(Number(id)),
      getCourseRank(Number(id)),
    ]);
    setCourseData(courseDetailData);
    setCourseRanking(courseRankData);
    setIsLoading(false);
  };

  const renderPolyLine = CoursePath();

  useEffect(() => {
    if (typeof id === 'string') {
      getCompleteCourseDetail(id);
    }
  }, [id]);
  return (
    <View style={styles.container}>
      {!isLoading && courseData?.path ? (
        <View style={styles.mapViewContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: courseData.path[0].latitude ?? 0,
              longitude: courseData.path[0].longitude ?? 0,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={courseData.path[0]}
              title="Start"
            />
            <Marker
              coordinate={courseData.path[courseData.path.length - 1]}
              title="End"
            >
              <PinIcon
                width={35}
                height={35}
              />
            </Marker>

            {renderPolyLine(courseData.path)}
          </MapView>
          <CourseInfoCard
            courseData={courseData}
            courseRanking={courseRanking}
          />
        </View>
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapViewContainer: {},
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },

  noDataCourseContainer: {
    marginVertical: 85,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  noDataText: {
    color: gray[30],
    fontSize: 13,
  },
});
