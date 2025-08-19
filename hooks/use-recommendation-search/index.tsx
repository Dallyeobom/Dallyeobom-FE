import {
  getFavoriteCourse,
  getRunningCourse,
  popularCourses,
} from '@/api/course/course.service';
import {
  extractFavoriteCourseNames,
  extractPopularCourseNames,
  extractRunningCourseNames,
} from '@/utils/recommand-course';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRecommendationSearch = () => {
  const handleRecommendationCourse = async () => {
    const params = {
      latitude: 37.5665,
      longitude: 126.978,
    };

    const popularCourseResponse = await popularCourses(params);
    const result1 = extractPopularCourseNames(popularCourseResponse);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const favoriteCourseResponse = await getFavoriteCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });

    const result2 = extractFavoriteCourseNames(favoriteCourseResponse);

    const runningCourseResponse = await getRunningCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });

    const result3 = extractRunningCourseNames(runningCourseResponse);

    const finalResult = [...result1, ...result2, ...result3];
    return finalResult;
  };

  return {
    handleRecommendationCourse,
  };
};
