import { useLocationStore } from '@/stores/location-store';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface LocationSettingModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ListRenderItemProps {
  item: string;
  index: number;
}

const getGoogleMapsApiKey = (): string => {
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;

  if (!apiKey) {
    console.warn('Google Maps API key not found in config');
    if (__DEV__) {
      return 'development_key';
    }
    throw new Error(
      'EXPO_PUBLIC_GOOGLE_MAPS_API_KEY is not set in environment variables.',
    );
  }
  return apiKey as string;
};

const EMPTY_LOCATIONS: string[] = [];

export default function LocationSettingModal({
  visible,
  onClose,
}: LocationSettingModalProps) {
  const NEARBY_SEARCH_RADIUS_DEGREES = 0.02; // ~2.2km
  const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();
  const { setSelectedLocation } = useLocationStore();

  const [nearbyDistricts, setNearbyDistricts] = useState<string[]>(EMPTY_LOCATIONS);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  const callGoogleMapsApi = useCallback(async (url: string, timeout = 10000) => {
    // 타임아웃 증가
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=300', // 5분 캐시
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('API 요청 타임아웃');
        } else {
          console.error('Google Maps API 호출 실패:', error.message);
        }
      } else {
        console.error('Google Maps API 호출 실패:', error);
      }
      return null;
    }
  }, []);

  const loadCurrentLocationAndDistricts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한이 필요합니다', '위치 권한을 허용해주세요.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      currentLocationRef.current = { lat: latitude, lng: longitude };

      const districts = new Set<string>();

      const searchRadius = NEARBY_SEARCH_RADIUS_DEGREES;
      const stepSize = 0.005; // 간격 약 550m
      const searchPoints: { lat: number; lng: number }[] = [];

      for (
        let latOffset = -searchRadius;
        latOffset <= searchRadius;
        latOffset += stepSize
      ) {
        for (
          let lngOffset = -searchRadius;
          lngOffset <= searchRadius;
          lngOffset += stepSize
        ) {
          const searchLat = latitude + latOffset;
          const searchLng = longitude + lngOffset;

          const distance = Math.sqrt(latOffset * latOffset + lngOffset * lngOffset);
          if (distance <= searchRadius) {
            searchPoints.push({ lat: searchLat, lng: searchLng });
          }
        }
      }

      searchPoints.sort((a, b) => {
        const distA = Math.sqrt(
          Math.pow(a.lat - latitude, 2) + Math.pow(a.lng - longitude, 2),
        );
        const distB = Math.sqrt(
          Math.pow(b.lat - latitude, 2) + Math.pow(b.lng - longitude, 2),
        );
        return distA - distB;
      });

      const geocodePromises = searchPoints.slice(0, 10).map(async (point) => {
        // 최대 10개 포인트
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${point.lat},${point.lng}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
        const data = await callGoogleMapsApi(url);

        if (data?.results?.[0]) {
          const result = data.results[0];
          const districtComponent = result.address_components.find(
            (component: any) =>
              component.types.includes('sublocality_level_2') ||
              (component.types.includes('sublocality_level_1') &&
                component.long_name.includes('동')),
          );

          const cityComponent = result.address_components.find((component: any) =>
            component.types.includes('administrative_area_level_1'),
          );

          const guComponent = result.address_components.find(
            (component: any) =>
              component.types.includes('sublocality_level_1') &&
              !component.long_name.includes('동'),
          );

          if (districtComponent && cityComponent) {
            const city = cityComponent.long_name;
            const gu = guComponent ? guComponent.long_name : '';
            const dong = districtComponent.long_name;
            return gu ? `${city} ${gu} ${dong}` : `${city} ${dong}`;
          }
        }
        return null;
      });

      const results = await Promise.allSettled(geocodePromises);

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          districts.add(result.value);
        }
      });

      const districtArray = Array.from(districts)
        .filter((name) => name.length > 0)
        .sort((a, b) => a.localeCompare(b, 'ko'))
        .slice(0, 15);

      if (districtArray.length > 0) {
        setNearbyDistricts(districtArray);
      } else {
        Alert.alert(
          '위치 정보 없음',
          '현재 위치 주변의 행정구역 정보를 찾을 수 없습니다.',
          [{ text: '확인' }],
        );
        setNearbyDistricts([]);
      }
    } catch (error: unknown) {
      console.error('위치 로드 실패:', error);
      Alert.alert(
        '위치 로드 실패',
        '위치 정보를 불러오는데 실패했습니다. 네트워크 연결을 확인해주세요.',
        [{ text: '확인' }],
      );
      setNearbyDistricts([]);
    } finally {
      setLoading(false);
    }
  }, [GOOGLE_MAPS_API_KEY, callGoogleMapsApi]);

  const searchLocation = useCallback(async (): Promise<void> => {
    if (!searchText.trim()) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setLoading(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const queries = [searchText + '동', searchText];

        const searchPromises = queries.map(async (query) => {
          const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(regions)&language=ko&components=country:kr&key=${GOOGLE_MAPS_API_KEY}`;
          return await callGoogleMapsApi(autocompleteUrl);
        });

        const results = await Promise.allSettled(searchPromises);
        const allPredictions: string[] = [];

        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value?.predictions) {
            const predictions = result.value.predictions
              .filter(
                (prediction: any) =>
                  prediction.description &&
                  typeof prediction.description === 'string' &&
                  (prediction.description.includes('동') ||
                    prediction.description.includes(searchText)),
              )
              .map((prediction: any) => prediction.description as string);

            allPredictions.push(...predictions);
          }
        });

        const uniqueResults = [...new Set(allPredictions)]
          .sort((a, b) => {
            const aScore = a.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0;
            const bScore = b.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0;
            return bScore - aScore;
          })
          .slice(0, 10);

        if (uniqueResults.length > 0) {
          setSearchResults(uniqueResults);
        } else {
          setSearchResults(['검색 결과가 없습니다.']);
        }
      } catch (error: unknown) {
        console.error('검색 실패:', error);
        Alert.alert('검색 실패', '검색에 실패했습니다. 네트워크 연결을 확인해주세요.', [
          { text: '확인' },
        ]);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
  }, [searchText, GOOGLE_MAPS_API_KEY, callGoogleMapsApi]);

  const getCoordinatesFromAddress = useCallback(
    async (address: string): Promise<{ lat: number; lng: number } | null> => {
      if (currentLocationRef.current && address.includes('현재 위치')) {
        return currentLocationRef.current;
      }

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const data = await callGoogleMapsApi(url);

      if (data?.results?.[0]?.geometry?.location) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    },
    [GOOGLE_MAPS_API_KEY, callGoogleMapsApi],
  );

  const handleLocationSelect = useCallback(
    async (locationName: string): Promise<void> => {
      try {
        const coords = await getCoordinatesFromAddress(locationName);
        if (coords) {
          setSelectedLocation(locationName, coords);
        }
        onClose();
      } catch (error: unknown) {
        console.error('위치 선택 실패:', error);
        onClose();
      }
    },
    [onClose, setSelectedLocation, getCoordinatesFromAddress],
  );

  const renderLocationItem = useCallback(
    ({ item }: ListRenderItemProps) => (
      <TouchableOpacity
        style={styles.locationItem}
        onPress={() => handleLocationSelect(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.locationText}>{item}</Text>
      </TouchableOpacity>
    ),
    [handleLocationSelect],
  );

  const keyExtractor = useCallback(
    (item: string, index: number): string => `location_${item}_${index}`,
    [],
  );

  const displayData = useMemo(() => {
    return searchResults.length > 0 ? searchResults : nearbyDistricts;
  }, [searchResults, nearbyDistricts]);

  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text.trim()) {
        searchLocation();
      } else {
        setSearchResults([]);
      }
    },
    [searchLocation],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>위치 설정</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="close"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="동명(읍,면) 입력 (ex 서초동)"
              value={searchText}
              onChangeText={handleSearchTextChange}
              placeholderTextColor="#999"
              returnKeyType="search"
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.currentLocationButton, loading && styles.buttonDisabled]}
            onPress={loadCurrentLocationAndDistricts}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Ionicons
              name="location"
              size={20}
              color="white"
              style={styles.locationIcon}
            />
            <Text style={styles.currentLocationText}>
              {loading ? '위치 가져오는 중...' : '현재 위치 주변 보기'}
            </Text>
          </TouchableOpacity>

          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>
              {searchResults.length > 0 ? '검색 결과' : '추천 위치'}
            </Text>

            {loading && displayData.length === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color="#6366F1"
                />
                <Text style={styles.loadingText}>위치 정보를 불러오는 중...</Text>
              </View>
            ) : displayData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="location-outline"
                  size={48}
                  color="#9CA3AF"
                />
                <Text style={styles.emptyText}>
                  위치 정보가 없습니다.{'\n'}
                  [현재 위치 주변 보기]를 눌러 위치를 불러오거나{'\n'}
                  원하는 지역을 검색해보세요.
                </Text>
              </View>
            ) : (
              <FlatList
                data={displayData}
                renderItem={renderLocationItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                style={styles.locationList}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={8}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  currentLocationButton: {
    backgroundColor: '#7028FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  locationIcon: {
    marginRight: 8,
  },
  currentLocationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendedSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  locationText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
