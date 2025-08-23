import { getGoogleMapsApiKey } from '@/utils/google';
import { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useGoogleMapsApi } from '../use-google-map-api';

export const useSearchText = () => {
  const callGoogleMapsApi = useGoogleMapsApi();
  const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchText, onChangeSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const searchLocation = useCallback(async (): Promise<void> => {
    if (!searchText.trim()) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setSearchLoading(true);

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
          setSearchResults([]);
        }
      } catch (error: unknown) {
        console.error('검색 실패:', error);
        Alert.alert('검색 실패', '검색에 실패했습니다. 네트워크 연결을 확인해주세요.', [
          { text: '확인' },
        ]);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 200);
  }, [searchText, GOOGLE_MAPS_API_KEY, callGoogleMapsApi]);

  return {
    searchText,
    onChangeSearchText,
    searchLoading,
    searchResults,
    setSearchResults,
    searchLocation,
  };
};
