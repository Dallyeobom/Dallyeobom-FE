import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
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
    View
} from 'react-native';

interface LocationSettingModalProps {
  visible: boolean;
  onClose: () => void;
  onLocationSelect?: (location: string) => void;
}

interface ListRenderItemProps {
  item: string;
  index: number;
}

const getGoogleMapsApiKey = (): string => {
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;

  if (!apiKey) {
    console.warn('Google Maps API key not found in config');
    return __DEV__ ? 'development_key' : '';
  }

  return apiKey as string;
};

export default function LocationSettingModal({ visible, onClose, onLocationSelect }: LocationSettingModalProps) {
  const [nearbyDistricts, setNearbyDistricts] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

  const callGoogleMapsApi = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Google Maps API 호출 실패:', error);
      return null;
    }
  }, []);

  // Geocoding API로 좌표에서 동 정보 추출
  const getDistrictFromGeocoding = useCallback(async (lat: number, lng: number): Promise<string | null> => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
    const data = await callGoogleMapsApi(url);

    if (data?.results && data.results.length > 0) {
      const result = data.results[0];

      const districtComponent = result.address_components.find((component: any) =>
        component.types.includes('sublocality_level_2') ||
        (component.types.includes('sublocality_level_1') && component.long_name.includes('동'))
      );

      const cityComponent = result.address_components.find((component: any) =>
        component.types.includes('administrative_area_level_1')
      );

      const guComponent = result.address_components.find((component: any) =>
        component.types.includes('sublocality_level_1') && !component.long_name.includes('동')
      );

      if (districtComponent && cityComponent) {
        const city = cityComponent.long_name;
        const gu = guComponent ? guComponent.long_name : '';
        const dong = districtComponent.long_name;

        return gu ? `${city} ${gu} ${dong}` : `${city} ${dong}`;
      }
    }
    return null;
  }, [GOOGLE_MAPS_API_KEY, callGoogleMapsApi]);

  // Google Places API로 주변 행정구역 검색
  const searchNearbyDistricts = useCallback(async (lat: number, lng: number): Promise<void> => {
    try {
      const districts = new Set<string>();

      // 방법 1: Nearby Search로 행정구역 검색
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=sublocality&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const nearbyData = await callGoogleMapsApi(nearbyUrl);

      if (nearbyData?.results) {
        nearbyData.results.forEach((place: any) => {
          if (place.name && typeof place.name === 'string' && place.name.includes('동')) {
            districts.add(place.name);
          }
        });
      }

      // 방법 2: 반경 내 여러 지점에서 Geocoding으로 동 정보 수집
      const searchRadius = 0.03; // 약 3km
      const stepSize = 0.008; // 검색 간격

      for (let latOffset = -searchRadius; latOffset <= searchRadius; latOffset += stepSize) {
        for (let lngOffset = -searchRadius; lngOffset <= searchRadius; lngOffset += stepSize) {
          const searchLat = lat + latOffset;
          const searchLng = lng + lngOffset;

          const district = await getDistrictFromGeocoding(searchLat, searchLng);
          if (district) {
            districts.add(district);
          }

          // API 호출 제한을 위해 일부만 검색
          if (districts.size >= 15) break;
        }
        if (districts.size >= 15) break;
      }

      const districtArray = Array.from(districts)
        .filter(name => name.length > 0)
        .sort((a, b) => a.localeCompare(b, 'ko'))
        .slice(0, 12); // 최대 12개까지

      setNearbyDistricts(districtArray.length > 0 ? districtArray : [
        '서울특별시 강남구 역삼동',
        '서울특별시 강남구 논현동',
        '서울특별시 서초구 서초동'
      ]);

    } catch (error) {
      console.error('주변 동 검색 실패:', error);
    }
  }, [GOOGLE_MAPS_API_KEY, getDistrictFromGeocoding, callGoogleMapsApi]);

  // 현재 위치 가져오고 주변 지역 로드하는 공통 함수
  const loadCurrentLocationAndDistricts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      // 1. 현재 위치 가져오기
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('권한이 필요합니다', '위치 권한을 허용해주세요.');
        setNearbyDistricts(['서울특별시 강남구 역삼동', '서울특별시 강남구 논현동', '서울특별시 서초구 서초동']);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      // 2. 주변 행정구역 검색하여 추천 위치 업데이트
      await searchNearbyDistricts(latitude, longitude);

    } catch (error) {
      console.error('위치 로드 실패:', error);
      setNearbyDistricts([
        '서울특별시 강남구 역삼동',
        '서울특별시 강남구 논현동',
        '서울특별시 서초구 서초동',
      ]);
    } finally {
      setLoading(false);
    }
  }, [searchNearbyDistricts]);

  const loadNearbyDistricts = useCallback(async (): Promise<void> => {
    await loadCurrentLocationAndDistricts();
  }, [loadCurrentLocationAndDistricts]);

  // Google Places Autocomplete API로 재검색
  const searchWithAutocomplete = useCallback(async (): Promise<void> => {
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(searchText)}&types=(regions)&language=ko&components=country:kr&key=${GOOGLE_MAPS_API_KEY}`;
    const data = await callGoogleMapsApi(autocompleteUrl);

    if (data?.predictions && data.predictions.length > 0) {
      const autocompleteResults: string[] = data.predictions
        .filter((prediction: any) =>
          prediction.description && typeof prediction.description === 'string' &&
          (prediction.description.includes('동') || prediction.description.includes(searchText))
        )
        .slice(0, 8)
        .map((prediction: any) => prediction.description as string);

      setSearchResults(autocompleteResults);
    } else {
      setSearchResults([`${searchText} 관련 위치를 찾을 수 없습니다.`]);
    }
  }, [searchText, GOOGLE_MAPS_API_KEY, callGoogleMapsApi]);

  // 검색 기능 (Google Places API 활용)
  const searchLocation = useCallback(async (): Promise<void> => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);
      const query = encodeURIComponent(`${searchText} 동 서울`);
      const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const data = await callGoogleMapsApi(textSearchUrl);

      if (data?.results && data.results.length > 0) {
        const searchResults: string[] = data.results
          .filter((place: any) => {
            return place.types && Array.isArray(place.types) && place.types.some((type: string) =>
              type.includes('sublocality') ||
              type.includes('administrative_area') ||
              (place.name && typeof place.name === 'string' && place.name.includes('동'))
            );
          })
          .slice(0, 10)
          .map((place: any) => {
            if (place.formatted_address && typeof place.formatted_address === 'string') {
              const addressParts = place.formatted_address.split(' ');
              const relevantParts = addressParts.filter((part: string) =>
                part.includes('시') || part.includes('구') || part.includes('동')
              );
              return relevantParts.length > 0 ? relevantParts.join(' ') : place.name || '';
            }
            return place.name || '';
          })
          .filter((name: string) => name.length > 0);

        const uniqueResults = [...new Set(searchResults)];
        setSearchResults(uniqueResults);

        if (uniqueResults.length === 0) {
          await searchWithAutocomplete();
        }
      } else {
        await searchWithAutocomplete();
      }

    } catch (error) {
      console.error('검색 실패:', error);
      Alert.alert('오류', '검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [searchText, GOOGLE_MAPS_API_KEY, searchWithAutocomplete, callGoogleMapsApi]);

  const handleLocationSelect = useCallback((locationName: string): void => {
    onLocationSelect?.(locationName);
    onClose();
  }, [onLocationSelect, onClose]);

  useEffect(() => {
    if (visible) {
      setSearchText('');
      setSearchResults([]);
      loadNearbyDistricts();
    }
  }, [visible, loadNearbyDistricts]);

  const renderLocationItem = useCallback(({ item }: ListRenderItemProps) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.locationText}>{item}</Text>
    </TouchableOpacity>
  ), [handleLocationSelect]);

  const keyExtractor = useCallback((item: string, index: number): string => `${item}_${index}`, []);

  const displayData = searchResults.length > 0 ? searchResults : nearbyDistricts;

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
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="동명(읍,면) 입력 (ex 서초동)"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={searchLocation}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={loadNearbyDistricts}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Ionicons name="location" size={20} color="white" style={styles.locationIcon} />
            <Text style={styles.currentLocationText}>
              {loading ? '위치 가져오는 중...' : '현재 위치로 설정하기'}
            </Text>
          </TouchableOpacity>
          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>추천 위치</Text>
            {loading && searchResults.length === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366F1" />
              </View>
            ) : (
              <FlatList
                data={displayData}
                renderItem={renderLocationItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                style={styles.locationList}
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
  },
});
