import { z } from 'zod';

import { NestModules } from '@llove/backend';

const letterEnv = z.object({
  OPENAI_API_KEY: z.string(),
  GEMINI_API_KEY: z.string(),
  DB: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
});

export const { OPENAI_API_KEY, GEMINI_API_KEY } = letterEnv.parse(process.env);

const {
  DB: database,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_PORT,
} = letterEnv.parse(process.env);

const port = parseInt(DB_PORT);

const migrationsPath = () => {
  const migrationsPath = NestModules.Typeorm.migrationsPath('letter');
  return migrationsPath;
};

const migrations = migrationsPath();

export const LETTER_DB_ENV = {
  database,
  host,
  password,
  port,
  username,
  migrations,
};
