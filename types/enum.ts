import { z } from 'zod';

export const rankingEnum = z.enum(['WEEKLY', 'MONTHLY', 'YEARLY']);

export type RankingEnum = z.infer<typeof rankingEnum>;
