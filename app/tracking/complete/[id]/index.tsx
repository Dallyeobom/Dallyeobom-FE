import { courseDetail, getCourseRank } from '@/api/course/course.service';
import CourseInfoCard from '@/components/card/course-info-card';
import LoadingSpinner from '@/components/loading';
import { CourseDetailResponse, CourseRankResponse } from '@/types/course';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

function Index() {
  const { id } = useLocalSearchParams();
  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(null);
  const [courseRanking, setCourseRanking] = useState<CourseRankResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getCompleteCourseDetail = async (id: string) => {
    // const result = await courseDetail(Number(id));
    const [courseDetailData, courseRankData] = await Promise.all([
      courseDetail(Number(id)),
      getCourseRank(Number(id)),
    ]);
    setCourseData(courseDetailData);
    setCourseRanking(courseRankData);
    setIsLoading(false);
  };

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

            <Polyline
              coordinates={courseData.path}
              strokeColor="#00BFFF"
              strokeWidth={4}
            />
          </MapView>
          <CourseInfoCard courseData={courseData} />
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
  mapViewContainer: {
    // height: '100%',
    // overflow: 'hidden',
    // borderRadius: 20,
    // marginBottom: 30,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },
});
