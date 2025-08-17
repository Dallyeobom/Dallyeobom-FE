import { popularCourses } from '@/api/course/course.service';
import NoDataItem from '@/components/item/no-data-item';
import SearchCourseItem from '@/components/item/search-course-item';
import VerticalList from '@/components/list/verical-list';
import { useDebounce } from '@/hooks/use-debounce';
import { useRecommendationSearch } from '@/hooks/use-recommendation-search';
import { useSearchResult } from '@/hooks/use-search-result';
import { useSearchText } from '@/hooks/use-search-text';
import { useLocationStore } from '@/stores/location-store';
import { gray, main } from '@/styles/color';
import { showErrorAlert } from '@/utils/error-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [recommandationTextArr, setRecommendationTextArr] = useState<string[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { handleRecommendationCourse } = useRecommendationSearch();
  const { searchResultCourseArr, setSearchResultCourseArr, handleGetSearchResult } =
    useSearchResult();
  const { selectedLocation, selectedCoords } = useLocationStore();

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
    await AsyncStorage.setItem('searchText', item);
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

  useEffect(() => {
    handleRecommendationCourse().then((data) => {
      if (!data) return [];
      setRecommendationTextArr([...data]);
    });
  }, []);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) return;

    handleGetSearchResult(debouncedValue);
  }, [debouncedValue]);

  // console.log('searchText ====>>>>>>>>', searchText);
  // console.log('debouceVAle', debouncedValue);
  // console.log('searchResultCourseArr ===>>>', searchResultCourseArr);
  // console.log('searchResult컨테이너', searchResultCourseArr);

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
              console.log('온체인지 텍스뜨응으 ===>>>>>>', text);
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
          <View style={styles.recommandSearchContainer}>
            <Text style={styles.searchText}>추천검색</Text>
            <FlatList
              // data={recommandationTextArr}
              data={[
                '서초구',
                '방배동',
                '라면',
                '서울 자전거 코스',
                '장거리',
                'test6',
                'test7',
                'test8',
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

  recommandSearchContainer: {
    display: 'flex',
    rowGap: 10,

    paddingLeft: 20,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '800',
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
    fontSize: 18,
  },
  searchResultCourseContainer: {
    display: 'flex',
    backgroundColor: 'blue',
    rowGap: 10,
    paddingLeft: 20,
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 700,
  },
});
