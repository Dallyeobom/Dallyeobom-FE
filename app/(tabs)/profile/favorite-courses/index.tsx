import { getFavoriteCourse } from '@/api/course/course.service';
import MyrunningCourseItem from '@/components/item/my-running-course-item';
import NoDataItem from '@/components/item/no-data-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
import { testData } from '@/mocks/data';
import { gray } from '@/styles/color';
import { FavoriteCourseItem } from '@/types/course';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function FavoriteCourses() {
  const [favoriteCourseData, setFavoriteCourseData] = useState<FavoriteCourseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getMyFavoriteCourses = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const data = await getFavoriteCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });
    if (!data || data?.items.length === 0) {
      // TODO: UI확인을 위해 임시로 넣음
      setFavoriteCourseData(testData);
    } else {
      setFavoriteCourseData(data?.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyFavoriteCourses();
  }, []);

  return (
    <View style={styles.section}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {favoriteCourseData.length > 0 ? (
            <VerticalList
              data={favoriteCourseData}
              renderItem={MyrunningCourseItem}
              // handleScroll={handleScroll}
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
                <Text style={styles.noDataText}>현재 내가 선택한</Text>
                <Text style={styles.noDataText}>찜 코스가 없습니다.</Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default FavoriteCourses;

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
