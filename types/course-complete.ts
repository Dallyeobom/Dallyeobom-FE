import { z } from 'zod';

export const courseCompleteHistoryParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

const courseCompleteHistoryItemSchema = z.object({
  id: z.number().int(),
  courseId: z.number().int().optional(),
  name: z.string(),
  level: z.string(),
  interval: z.number().int(),
  length: z.number().int(),
  completionImage: z.string().url().optional(),
});

const courseCompleteHistoryResponseSchema = z.object({
  items: z.array(courseCompleteHistoryItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});
export type CourseCompleteHistoryParams = z.infer<
  typeof courseCompleteHistoryParamsSchema
>;

export type CourseCompleteHistoryItem = z.infer<typeof courseCompleteHistoryItemSchema>;
export type CourseCompleteHistoryResponse = z.infer<
  typeof courseCompleteHistoryResponseSchema
>;
