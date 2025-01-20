import { resolve } from 'path';
import { z } from 'zod';

const userEnv = z.object({
  DB: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
});

export const USER_ENV = userEnv.parse(process.env);

const {
  DB: database,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_PORT,
} = userEnv.parse(process.env);

const port = parseInt(DB_PORT);

const migrationsPath = () => {
  const outputA = resolve(__dirname).split('\\dist');
  const output = outputA[0] + outputA[1] + '\\src\\migrations\\**\\*.js';

  return output;
};

const migrations = [migrationsPath()];

export const USER_DB_ENV = {
  database,
  host,
  password,
  port,
  username,
  migrations,
};
