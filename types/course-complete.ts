import { z } from 'zod';

export const courseCompleteHistoryParamsSchema = z.object({
  userId: z.number(),

  lastId: z.number().optional(),
  size: z.number().optional(),
});

export type CourseCompleteHistoryRequest = z.infer<
  typeof courseCompleteHistoryParamsSchema
>;
