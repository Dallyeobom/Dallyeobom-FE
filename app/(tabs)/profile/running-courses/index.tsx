import { getRunningCourse } from '@/api/course/course.service';
import MyRunningCourseItem from '@/components/item/my-running-course-item';
import NoDataItem from '@/components/item/no-data-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
import { gray } from '@/styles/color';
import { RunningCourseItem } from '@/types/course';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RunningCourses() {
  const [myRunningCourseData, setMyRunningCourseData] = useState<RunningCourseItem[]>([]);
  const [loading, setLoading] = useState(false);

  // refetch할..
  const getMyRunningCourses = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const data = await getRunningCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });

    setMyRunningCourseData(data?.items || []);

    setLoading(false);
  };

  useEffect(() => {
    getMyRunningCourses();
  }, []);

  return (
    <View style={styles.section}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {myRunningCourseData.length > 0 ? (
            <VerticalList
              data={myRunningCourseData}
              renderItem={(item) => (
                <MyRunningCourseItem
                  {...item}
                  handleFetch={getMyRunningCourses}
                />
              )}
            />
          ) : (
            <View
              style={[
                styles.noDataPopularCourseContainer,
                {
                  marginTop: '60%',
                },
              ]}
            >
              <NoDataItem source={require('@/assets/images/priority-high.png')} />
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>아직 달린 코스가 없네요</Text>
                <Text style={styles.noDataText}>첫 코스를 달려보세요!</Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default RunningCourses;

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    padding: 8,
    flex: 1,
    backgroundColor: '#fff',
  },
  titleBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  noDataNearRunnerCourseContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
  },

  noDataPopularCourseContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
  },
  noDataTextContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  noDataText: {
    color: gray[30],
    fontSize: 16,
  },
});
