import { popularCourses } from '@/api/course/course.service';
import { PopularCoursesResponse } from '@/types/course';
import { getGoogleMapsApiKey } from '@/utils/google';
import { useState } from 'react';

export const useSearchResult = () => {
  const [searchResultCourseArr, setSearchResultCourseArr] = useState<
    PopularCoursesResponse[]
  >([]);
  const handleGetSearchResult = async (address: string) => {
    if (!address || address.trim() === '') {
      return;
    }
    try {
      const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(geocodeUrl);

      const jsonResponse = await response.json();
      if (!jsonResponse.results || jsonResponse.results.length === 0) {
        console.error('Geocode API 결과가 없습니다.');
        return;
      }
      const location = jsonResponse.results[0].geometry.location;
      const radius = 1000;
      const maxCount = 10;
      const params = {
        // latitude: location.lat,
        // longitude: location.lng,
        latitude: 37.5665,
        longitude: 126.978,

        radius,
        maxCount,
      };
      const searchResultResponse = await popularCourses(params);
      if (!searchResultResponse) {
        return;
      }
      setSearchResultCourseArr(searchResultResponse);
    } catch (error) {
      console.error('error', error);
    }
  };

  return {
    handleGetSearchResult,
    searchResultCourseArr,
    setSearchResultCourseArr,
  };
};
