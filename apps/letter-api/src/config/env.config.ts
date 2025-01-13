import { z } from 'zod';

const bffEnv = z.object({
  OPENAI_API_KEY: z.string(),
});

export const OPENAI_API_KEY = bffEnv.parse(process.env).OPENAI_API_KEY;
