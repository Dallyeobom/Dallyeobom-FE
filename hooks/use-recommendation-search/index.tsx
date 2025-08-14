import {
  getFavoriteCourse,
  getRunningCourse,
  popularCourses,
} from '@/api/course/course.service';
import {
  getRecommandationSearchText,
  getRecommandationSearchText2,
} from '@/utils/recommand-course';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRecommendationSearch = () => {
  const handleRecommendationCourse = async () => {
    const params = {
      latitude: 37.5665,
      longitude: 126.978,
    };

    // 내 주변 인기코스
    const popularCourseResponse = await popularCourses(params);
    const result1 = getRecommandationSearchText(popularCourseResponse);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const favoriteCourseResponse = await getFavoriteCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });

    const result2 = getRecommandationSearchText2(favoriteCourseResponse);

    const runningCourseResponse = await getRunningCourse({
      userId: Number(userId),
      lastId: 10,
      size: 10,
    });

    const result3 = getRecommandationSearchText2(runningCourseResponse);

    const finalResult = [...result1, ...result2, ...result3];
    return finalResult;
  };

  return {
    handleRecommendationCourse,
  };
};
