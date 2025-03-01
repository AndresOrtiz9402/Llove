import { z } from 'zod';

const bffEnv = z.object({
  LETTER_API_URL: z.string(),
  USER_API_URL: z.string(),
  SECRET_JWT_KEY: z.string(),
});

export const BFF_ENV = { ...bffEnv.parse(process.env) };

export type BFF_ENV = z.infer<typeof bffEnv>;
