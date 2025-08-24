import { getFavoriteCourse } from '@/api/course/course.service';
import MyFavoriteItem from '@/components/item/my-favorite-item';
import NoDataItem from '@/components/item/no-data-item';
import VerticalList from '@/components/list/verical-list';
import LoadingSpinner from '@/components/loading';
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

    setFavoriteCourseData(data?.items || []);
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
              renderItem={(item) => (
                <MyFavoriteItem
                  {...item}
                  handleFetch={getMyFavoriteCourses}
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
              <NoDataItem source={require('@/assets/images/dot.png')} />
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>아직 찜한 코스가 없네요</Text>
                <Text style={styles.noDataText}>코스를 찜하면 모아볼 수 있어요</Text>
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
