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
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setLastId] = useState<number>();

  const getMyRecordedCourses = async () => {
    try {
      if (!hasNext || loading) return;

      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        return;
      }

      setLoading(true);
      let data;
      if (!lastId) {
        data = await myRecordedCourseHistory({
          userId: Number(userId),
          size: 10,
        });
      } else {
        data = await myRecordedCourseHistory({
          userId: Number(userId),
          size: 10,
          lastId: lastId,
        });
      }
      if (!data || data.items.length === 0) return [];

      setMyRecordedCourseData((prev) => [...prev, ...data?.items]);
      setHasNext(data?.hasNext ?? false);
      setLastId(data?.lastId - 1);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
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
              fetchMoreCallback={getMyRecordedCourses}
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

export default RecordedCourses;

const styles = StyleSheet.create({
  section: {
    height: '100%',
    paddingHorizontal: 20,
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
