import { z } from 'zod';

const bffEnv = z.object({
  LETTER_API_URL: z.string(),
  USER_API_URL: z.string(),
});

const env = bffEnv.parse(process.env);

export const BFF_ENV = {
  LETTER_API_URL: env.LETTER_API_URL,
  USER_API_URL: env.USER_API_URL,
};

export type BFF_ENV = z.infer<typeof bffEnv>;
