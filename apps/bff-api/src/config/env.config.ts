import { z } from 'zod';

const bffEnv = z.object({
  LETTER_API_COMPLETIONS_URL: z.string(),
  LETTER_API_LETTER_GENERATE_URL: z.string(),
});

const env = bffEnv.parse(process.env);

export const BFF_ENV = {
  LETTER_API_COMPLETIONS_URL: new URL(env.LETTER_API_COMPLETIONS_URL),
  LETTER_API_LETTER_GENERATE_URL: new URL(env.LETTER_API_LETTER_GENERATE_URL),
};
