import { z } from 'zod';
const pathPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export const recordedCourseHistoryParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

const completeCourseItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  overViewImageUrl: z.string(),
  length: z.number(),
  level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  isLiked: z.boolean(),
});
export type CompleteCourseItem = z.infer<typeof completeCourseItemSchema>;

const recordedCourseHistoryItemSchema = z.object({
  id: z.number().int(),
  courseId: z.number().int(),
  title: z.string(),
  interval: z.number(),
  length: z.number(),
  completeDate: z.string(),
  path: z.array(pathPointSchema),
});

const recordedCourseHistoryResponseSchema = z.object({
  items: z.array(recordedCourseHistoryItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});
export type RecordedCourseHistoryParams = z.infer<
  typeof recordedCourseHistoryParamsSchema
>;

export type RecordedCourseHistoryItem = z.infer<typeof recordedCourseHistoryItemSchema>;
export type RecordedCourseHistoryResponse = z.infer<
  typeof recordedCourseHistoryResponseSchema
>;

// 코스 생성

const courseInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  courseLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
});

export const createCourseParamsSchema = z.object({
  review: z.string(),
  interval: z.number(),
  path: z.array(pathPointSchema),
  courseVisibility: z.enum(['PUBLIC', 'PRIVATE']),
  courseCreateInfo: courseInfoSchema,
});

export type CreateCourseParams = z.infer<typeof createCourseParamsSchema>;

const createCourseResponseSchema = z.object({
  id: z.number(),
});

export type CreateCourseRespose = z.infer<typeof createCourseResponseSchema>;
