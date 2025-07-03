import { z } from 'zod';

export const rankingEnum = z.enum(['weekly', 'montly', 'yearly']);

export type RankingEnum = z.infer<typeof rankingEnum>;
