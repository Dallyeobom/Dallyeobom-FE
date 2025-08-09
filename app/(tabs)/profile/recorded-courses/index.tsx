import { myRecordedCourseHistory } from '@/api/course-complete/course-complete.service';
import MyRecordedCourseItem from '@/components/item/my-recorded-course-item';
import NoDataItem from '@/components/item/no-data-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
import { exampleCourseCompleteHistory } from '@/mocks/data';
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
      // TODO: UI확인을 위해 임시로 넣음
      setMyRecordedCourseData(exampleCourseCompleteHistory);
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
                styles.noDataPopularCourseContainer,
                {
                  marginTop: '34%',
                  marginBottom: '20%',
                },
              ]}
            >
              <NoDataItem />
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>내가 완주한 코스가</Text>
                <Text style={styles.noDataText}>없습니다.</Text>
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
