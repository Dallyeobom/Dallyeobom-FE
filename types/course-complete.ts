import { z } from 'zod';

export const recordedCourseHistoryParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

const recordedCourseHistoryItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  location: z.string(),
  overViewImageUrl: z.string(),
  length: z.number().int(),
  level: z.string(),
  isLiked: z.boolean(),
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
