import { resolve } from 'path';

import { NestModules } from '@llove/backend';
import { LETTER_DB_ENV } from '.';

const {
  DB: database,
  DB_HOST: host,
  DB_PASSWORD: password,
  DB_PORT,
  DB_USER: username,
} = LETTER_DB_ENV;

const port = parseInt(DB_PORT);

const migrationsPath = () => {
  const outputA = resolve(__dirname).split('\\dist');
  const output = outputA[0] + outputA[1] + '\\src\\migrations\\**\\*.js';

  return output;
};
//TODO: get the migrations files from compiled project folder.

const migrations = [migrationsPath()];

const connectionOptions = {
  database,
  host,
  password,
  username,
  port,
  migrations,
};

export const LetterTypeOrmModule =
  NestModules.Typeorm.AsyncUserTypeOrmModule(connectionOptions);
