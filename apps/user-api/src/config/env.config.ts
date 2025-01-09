import { z } from 'zod';

const userEnv = z.object({
  DB: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
});

export const USER_ENV = userEnv.parse(process.env);
