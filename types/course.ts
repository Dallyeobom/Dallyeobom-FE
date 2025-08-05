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
});
export type CourseDetailResponse = z.infer<typeof courseDetailSchema>;
