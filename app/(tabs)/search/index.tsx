import { useRecommendationSearch } from '@/hooks/use-recommendation-search';
import { useSearchText } from '@/hooks/use-search-town';
import { gray, main } from '@/styles/color';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Search() {
  // const [searchText, onChangSearchText] = useState('');
  // const [searchLoading, setSearchLoading] = useState(false);
  const [recommandationTextArr, setRecommendationTextArr] = useState<string[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { handleRecommendationCourse } = useRecommendationSearch();
  const { searchText, onChangSearchText, searchLoading, searchResults, searchLocation } =
    useSearchText();

  // 검색어 ChangeText
  const handleSearchTextChange = (text: string) => {
    onChangSearchText(text);
  };

  useEffect(() => {
    handleRecommendationCourse().then((data) => {
      if (!data) return [];
      setRecommendationTextArr([...data]);
    });
  }, []);

  return (
    <View>
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
            onChangeText={handleSearchTextChange}
            value={searchText}
            placeholder="동명(읍,면) 입력 (ex 서초동)"
          />
          {searchText.length > 0 && (
            <Pressable
              style={styles.image}
              onPress={() => {
                onChangSearchText('');
              }}
            >
              <Image source={require('@/assets/images/close.png')} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.recommandSearch}>
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
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
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

  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingLeft: 20,
    // paddingHorizontal: 20,
  },
  recommandSearch: {
    display: 'flex',
    rowGap: 10,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '800',
  },
  itemContainer: {
    backgroundColor: gray[10],
    borderRadius: 20,
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
});
