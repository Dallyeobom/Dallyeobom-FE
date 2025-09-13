import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});
export const nearUserCoursesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  courseImage: z.string().url(),
  user: userSchema,
});

export const popularCourseResponseSchema = z.object({
  id: z.number(),
  isLiked: z.boolean(),
  length: z.number(),
  level: z.string(),
  name: z.string(),
  location: z.string().url(),
  overViewImageUrl: z.string().url(),
});
export type NearUserCoursesResponse = z.infer<typeof nearUserCoursesResponseSchema>;
export type PopularCoursesResponse = z.infer<typeof popularCourseResponseSchema>;

export const coursesParamsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number().optional(),
  maxCount: z.number().optional(),
});

export type NearRunnerCoursesRequest = z.infer<typeof coursesParamsSchema>;
export type PopularCoursesRequest = z.infer<typeof coursesParamsSchema>;

export const courseDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  courseLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  imageUrl: z.string().url(),
  location: z.string(),
  overViewImageUrl: z.string().url(),
  length: z.number().positive(),
  path: z
    .array(
      z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      }),
    )
    .min(1),
  isCreator: z.boolean(),
  isLiked: z.boolean(),
});
export type CourseDetailResponse = z.infer<typeof courseDetailSchema>;

export const courseLikeResponseSchema = z.object({
  isLiked: z.boolean(),
  likeCount: z.number(),
});

export type CourseLikeRespone = z.infer<typeof courseLikeResponseSchema>;

// 내가 찜한 코스
export const favoriteCourseParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

export type FavoriteCourseParams = z.infer<typeof favoriteCourseParamsSchema>;

const favoriteCourseItemSchema = z.object({
  id: z.number().int(),
  courseId: z.number(),
  name: z.string(),
  overViewImage: z.string(),
  length: z.number().int(),
  level: z.string(),
  isLiked: z.boolean(),
});

const favoriteCourseItemsResponseSchema = z.object({
  items: z.array(favoriteCourseItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});

export type FavoriteCourseItem = z.infer<typeof favoriteCourseItemSchema>;

export type FavoriteCourseItemsResponse = z.infer<
  typeof favoriteCourseItemsResponseSchema
>;

const runningCourseItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  location: z.string(),
  overViewImageUrl: z.string(),
  length: z.number().int(),
  level: z.string(),
  isLiked: z.boolean(),
});

const runningCourseItemsResponseSchema = z.object({
  items: z.array(runningCourseItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});

export type RunningCourseItem = z.infer<typeof runningCourseItemSchema>;

export type RunningCourseItemsResponse = z.infer<typeof runningCourseItemsResponseSchema>;

export const runningCourseParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

export type RunningCourseParams = z.infer<typeof runningCourseParamsSchema>;

const courseImageSchema = z.object({
  id: z.number().int(),
  url: z.string().url(),
});

const courseImagesResponseSchema = z.object({
  items: z.array(z.string()),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});

export type CourseImage = z.infer<typeof courseImageSchema>;
export type CourseImagesResponse = z.infer<typeof courseImagesResponseSchema>;

const userRankSchema = z.object({
  user: z.object({
    id: z.number().int(),
    nickname: z.string(),
    profileImage: z.string().url().optional(),
  }),
  interval: z.number().int(),
});

const courseRankResponseSchema = z.object({
  items: z.array(userRankSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});

export type UserRank = z.infer<typeof userRankSchema>;
export type CourseRankResponse = z.infer<typeof courseRankResponseSchema>;

const courseReviewUserSchema = z.object({
  id: z.number().int(),
  nickname: z.string(),
  profileImage: z.string().url().optional(),
});

const courseReviewItemSchema = z.object({
  id: z.number().int(),
  user: courseReviewUserSchema,
  review: z.string(),
  completionImages: z.array(z.string().url()),
  createdAt: z.string(),
});

const courseReviewResponseSchema = z.object({
  items: z.array(courseReviewItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});

export type CourseReviewUser = z.infer<typeof courseReviewUserSchema>;
export type CourseReviewItem = z.infer<typeof courseReviewItemSchema>;
export type CourseReviewResponse = z.infer<typeof courseReviewResponseSchema>;

export const courseReviewParamsSchema = z.object({
  lastId: z.number().optional(),
  size: z.number().optional(),
});

export type CourseReviewParams = z.infer<typeof courseReviewParamsSchema>;
