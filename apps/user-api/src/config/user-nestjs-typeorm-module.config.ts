import { nestModules } from '@llove/backend';

import { USER_ENV } from '.';
import { DataSource } from 'typeorm';

const {
  DB: database,
  DB_HOST: host,
  DB_PASSWORD: password,
  DB_PORT,
  DB_USER: username,
} = USER_ENV;

const port = parseInt(DB_PORT);

const connectionOptions = {
  database,
  host,
  password,
  username,
  port,
};

const dataSourceOptions =
  nestModules.typeorm.dataSourceOptions(connectionOptions);

export const UserTypeOrmModule =
  nestModules.typeorm.AsyncUserTypeOrmModule(dataSourceOptions);

export default new DataSource(dataSourceOptions);
