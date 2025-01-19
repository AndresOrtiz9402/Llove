import { z } from 'zod';

const letterEnv = z.object({
  OPENAI_API_KEY: z.string(),
  DB: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
});

export const { OPENAI_API_KEY } = letterEnv.parse(process.env);

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = letterEnv.parse(
  process.env
);

export const LETTER_DB_ENV = {
  DB,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
};
