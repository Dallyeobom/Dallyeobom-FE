import Constants from 'expo-constants';
export const getGoogleMapsApiKey = (): string => {
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

export const getKoreanAddress = (addressComponents: any) => {
  let city = '';
  let district = '';
  let dong = '';

  addressComponents.forEach((component: any) => {
    if (component.types.includes('administrative_area_level_1')) {
      city = component.long_name; // 시, 도..
    }
    if (component.types.includes('locality')) {
      district = component.long_name; // 구
    }
    if (component.types.includes('sublocality')) {
      dong = component.long_name; // 동
    }
  });
  return `${city} ${district} ${dong}`;
};
