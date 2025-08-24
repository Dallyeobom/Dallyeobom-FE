import { myRecordedCourseHistory } from '@/api/course-complete/course-complete.service';
import MyRecordedCourseItem from '@/components/item/my-recorded-course-item';
import NoDataItem from '@/components/item/no-data-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
import { gray } from '@/styles/color';
import { RecordedCourseHistoryItem } from '@/types/course-complete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RecordedCourses() {
  const [myRecordedCourseData, setMyRecordedCourseData] = useState<
    RecordedCourseHistoryItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  // refetch할..
  const getMyRecordedCourses = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const data = await myRecordedCourseHistory({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });
    if (!data || data?.items.length === 0) {
      setMyRecordedCourseData([]);
    } else {
      setMyRecordedCourseData(data?.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyRecordedCourses();
  }, []);

  return (
    <View style={styles.section}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {myRecordedCourseData.length > 0 ? (
            <VerticalList
              data={myRecordedCourseData}
              renderItem={(item) => (
                <MyRecordedCourseItem
                  {...item}
                  handleFetch={getMyRecordedCourses}
                />
              )}
            />
          ) : (
            <View
              style={[
                styles.noDataRecordedCourseContainer,
                {
                  marginTop: '60%',
                },
              ]}
            >
              <NoDataItem />
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

export default RecordedCourses;

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    padding: 8,
    flex: 1,
    backgroundColor: '#fff',
  },

  noDataRecordedCourseContainer: {
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
