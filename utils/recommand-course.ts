import {
  FavoriteCourseItemsResponse,
  PopularCoursesResponse,
  RunningCourseItemsResponse,
} from '@/types/course';

export const extractPopularCourseNames = (data: PopularCoursesResponse[] | null) => {
  if (!data) return [];
  return data.map((item) => item.name);
};

export const extractFavoriteCourseNames = (data: FavoriteCourseItemsResponse | null) => {
  if (!data) return [];
  return data.items.map((item) => item.name);
};

export const extractRunningCourseNames = (data: RunningCourseItemsResponse | null) => {
  if (!data) return [];
  return data.items.map((item) => item.name);
};
