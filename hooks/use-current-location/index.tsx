import { useGoogleMapsApi } from '@/hooks/use-google-map-api';
import { useLocationStore } from '@/stores/location-store';
import { getGoogleMapsApiKey, getKoreanAddress } from '@/utils/google';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';

const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

export const useCurrentLocation = () => {
  const { selectedLocation, setSelectedLocation } = useLocationStore();
  const [ isGetCurrentLocationLoading, setIsCurrentLocationLoading] = useState(false)
  const callGoogleMapsApi = useGoogleMapsApi();

  const getCurrentLocation = async () => {
    if (selectedLocation.length > 0) return;


    try{

        if (selectedLocation.length === 0) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          '위치 권한이 허용되지 않았습니다.',
          '앱 설정에서 위치 권한을 허용해주세요.',
          [
            {
              text: '설정 열기',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
        return;
      }

      setIsCurrentLocationLoading(true)
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude}, ${location.coords.longitude}&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const data = await callGoogleMapsApi(url);
      const address_components = data.results[0].address_components;
      const result = getKoreanAddress(address_components);
      setSelectedLocation(result, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }
    }catch(error){
      Alert.alert("위처 정보를 가져오는데  실패하였습니다.")

    }finally {
       setIsCurrentLocationLoading(false)


    }

  };

  return {
    getCurrentLocation,
    isGetCurrentLocationLoading
  }
};
