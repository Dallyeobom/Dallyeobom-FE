import { popularCourses } from '@/api/course/course.service';
import NoDataItem from '@/components/item/no-data-item';
import SearchCourseItem from '@/components/item/search-course-item';
import VerticalList from '@/components/list/verical-list';
import { useSearchTextAsyncStorage } from '@/hooks/use-async-storage/search-text';
import { useDebounce } from '@/hooks/use-debounce';
import { useRecommendationSearch } from '@/hooks/use-recommendation-search';
import { useSearchResult } from '@/hooks/use-search-result';
import { useSearchText } from '@/hooks/use-search-text';
import { useLocationStore } from '@/stores/location-store';
import { gray, main } from '@/styles/color';
import { showErrorAlert } from '@/utils/error-handler';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function Search() {
  const [recommendationTextArr, setRecommendationTextArr] = useState<string[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { handleRecommendationCourse } = useRecommendationSearch();
  const { searchResultCourseArr, setSearchResultCourseArr, handleGetSearchResult } =
    useSearchResult();
  const { selectedLocation, selectedCoords } = useLocationStore();
  const {
    savedSearchTextArr,
    handleSavedSearchText,
    handleDeleteSearchText,
    handleDeleteAllSearchText,
  } = useSearchTextAsyncStorage();

  const {
    searchText,
    onChangeSearchText,
    searchLoading,
    searchResults,
    setSearchResults,
    searchLocation,
  } = useSearchText();

  const { debouncedValue } = useDebounce(searchText, 500);

  const handleSelectedAddress = async (item: string) => {
    onChangeSearchText(item);
    setSearchResults([]);
    handleSavedSearchText(item);
  };

  const handleFetchPopularCourses = async () => {
    if (!selectedCoords?.lat || !selectedCoords.lng) return;
    try {
      const { lat: latitude, lng: longitude } = selectedCoords;

      const radius = 1000;
      const maxCount = 10;
      const params = {
        latitude: latitude,
        longitude: longitude,
        radius,
        maxCount,
      };
      const response = await popularCourses(params);
      setSearchResultCourseArr(response ?? []);
    } catch (error) {
      showErrorAlert(error, 'POPULAR_COURSES', '인기 코스를 불러오는데 실패했습니다.');
      setSearchResultCourseArr([]);
    }
  };

  const fetchRecommendationCourses = async () => {
    try {
      const data = await handleRecommendationCourse();
      if (!data) {
        setRecommendationTextArr([]);
        return;
      }
      setRecommendationTextArr(data);
    } catch (error) {
      console.error('추천 코스 에러:', error);
      setRecommendationTextArr([]);
    }
  };

  useEffect(() => {
    if (debouncedValue.trim().length === 0) return;
    handleGetSearchResult(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    fetchRecommendationCourses();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => {
            router.replace('/(tabs)');
          }}
        >
          <Image source={require('@/assets/images/back.png')} />
        </Pressable>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, searchText.length > 0 && styles.inputActiveBorder]}
            onChangeText={(text) => {
              onChangeSearchText(text);
              searchLocation();
              if (text.trim() === '') {
                setSearchResultCourseArr([]);
              }
            }}
            value={searchText}
            placeholder="동명(읍,면) 입력 (ex 서초동)"
          />
          {searchText.length > 0 && (
            <Pressable
              style={styles.image}
              onPress={() => {
                onChangeSearchText('');
                setSearchResults([]);
                setSearchResultCourseArr([]);
              }}
            >
              <Image source={require('@/assets/images/close.png')} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.container}>
        {searchText.length === 0 && (
          <View style={styles.recommandSearchAndSavedSearchContainer}>
            {/* 추천 검색어 */}
            <View style={styles.recommandSearchContainer}>
              <Text style={styles.searchText}>추천검색</Text>
              <FlatList
                // TODO: UI확인을 위해 현재 하드코딩
                // data={recommandationTextArr}
                data={[
                  '서초구',
                  '방배동',
                  '라면',
                  '서울 자전거 코스',
                  '장거리',
                  '테스트 입니다',
                ]}
                horizontal={true}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.item}>{item}</Text>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* 검색어 저장 */}
            {savedSearchTextArr.length > 0 && (
              <View style={styles.savedSearchContainer}>
                <View style={styles.savedSearchTitle}>
                  <Text style={styles.searchText}>검색 결과</Text>
                  <Pressable onPress={handleDeleteAllSearchText}>
                    <Text style={styles.deleteText}>전체 삭제</Text>
                  </Pressable>
                </View>
                <FlatList
                  data={savedSearchTextArr}
                  horizontal={false}
                  keyExtractor={(_, index) => String(index)}
                  renderItem={({ item, index }) => (
                    <Pressable
                      style={styles.savedSearchItem}
                      onPress={() => {
                        handleSelectedAddress(item);
                      }}
                    >
                      <View style={styles.savedSearchSubItem}>
                        <Image
                          source={require('@/assets/images/access-time.png')}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text
                          style={styles.searchItem}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {item}
                        </Text>
                      </View>
                      <View style={styles.deleteSearchItem}>
                        <Pressable
                          hitSlop={10}
                          onPress={() => {
                            handleDeleteSearchText(index);
                          }}
                        >
                          <Image
                            source={require('@/assets/images/delete.png')}
                            style={{ width: 14, height: 14 }}
                          />
                        </Pressable>
                      </View>
                    </Pressable>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            )}
          </View>
        )}

        {/* 검색어 결과 */}
        {searchText.length > 0 &&
          searchResults.length === 0 &&
          searchResultCourseArr.length === 0 && (
            <View style={[styles.noDataNearRunnerCourseContainer, { marginTop: '50%' }]}>
              <NoDataItem />
              <View style={styles.noDataTextContainer}>
                <Text style={styles.noDataText}>검색 결과가 없어요.</Text>
                <Text style={styles.noDataText}>다른 키워드로 다시 찾아보세요!</Text>
              </View>
            </View>
          )}

        {searchText.length > 0 && searchResults.length > 0 && (
          <View style={styles.searchResultContainer}>
            <FlatList
              data={searchResults}
              horizontal={false}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.searchItemContainer}
                  onPress={() => {
                    handleSelectedAddress(item);
                  }}
                >
                  <Image
                    source={require('@/assets/images/search-result.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={styles.searchItem}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        {/* 검색 결과 코스 */}
        {debouncedValue.length !== 0 &&
          searchResultCourseArr.length > 0 &&
          searchResults.length === 0 && (
            <View style={styles.searchResultCourseContainer}>
              <Text style={styles.searchResultText}>검색 결과</Text>
              <VerticalList
                data={searchResultCourseArr}
                renderItem={(item) => (
                  <SearchCourseItem
                    {...item}
                    handleFetch={handleFetchPopularCourses}
                  />
                )}
              />
            </View>
          )}
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    justifyContent: 'center',
    marginBottom: 10,
  },

  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    flex: 0.9,
  },
  input: {
    height: 52,
    borderWidth: 1,
    padding: 10,
    borderColor: '#cccccc',
    borderRadius: 8,
  },
  inputActiveBorder: {
    borderWidth: 1,
    borderColor: main[80],
    borderRadius: 8,
  },
  image: {
    position: 'absolute',
    width: 24,
    height: 24,
    top: '30%',
    right: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },

  container: {
    display: 'flex',
    rowGap: 10,
  },

  recommandSearchAndSavedSearchContainer: {
    display: 'flex',
    rowGap: 20,
  },

  recommandSearchContainer: {
    display: 'flex',
    rowGap: 10,
    paddingLeft: 20,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '800',
  },
  deleteText: {
    fontSize: 14,
    color: gray[15],
  },
  itemContainer: {
    backgroundColor: gray[15],
    borderRadius: 100,
    marginRight: 6,
    alignSelf: 'flex-start',
  },
  item: {
    color: gray[100],
    fontSize: 16,
    fontWeight: '500',
    height: 38,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  savedSearchContainer: {
    display: 'flex',
    rowGap: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  savedSearchTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  savedSearchItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  savedSearchSubItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    width: '90%',
  },
  deleteSearchItem: {},

  noDataNearRunnerCourseContainer: {
    display: 'flex',
    alignItems: 'center',
    rowGap: 8,
    height: SCREEN_HEIGHT,
  },
  noDataTextContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  noDataText: {
    color: gray[30],
    fontSize: 16,
  },

  searchResultContainer: {
    paddingLeft: 20,
  },

  searchItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 20,
  },
  searchItem: {
    flexShrink: 1,
    fontSize: 18,
    flexWrap: 'wrap',
  },
  searchResultCourseContainer: {
    display: 'flex',
    rowGap: 10,
    paddingLeft: 20,
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 700,
  },
});
