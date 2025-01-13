import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

import {
  LloveDataSourceConfig,
  LloveDataSourceOptions,
  LloveTypeOrmModule,
} from '.';

function pathToMigrations(param: string) {
  const outputA = param.split('\\dist');
  const output = outputA[0] + outputA[1] + '\\src\\migrations\\**\\*.js';

  return output;
}

export const dataSourceOptions: LloveDataSourceConfig = (
  connectionOptions: LloveDataSourceOptions
) => {
  /* const migrations = [resolve(__dirname + 'migrations\\**\\*.js')]; */
  const migrations = [pathToMigrations(resolve(__dirname))];
  //TODO: get the migrations files from compiled project folder.

  const { database, host, password, port, username } = connectionOptions;

  return {
    synchronize: false,
    migrationsRun: true,
    autoLoadEntities: true,
    type: 'postgres',
    database,
    host,
    password,
    port,
    username,
    migrations,
  };
};

export const SyncUserTypeOrmModule: LloveTypeOrmModule<DynamicModule> = (
  dataSourceOptions: DataSourceOptions
) => TypeOrmModule.forRoot(dataSourceOptions);

export const AsyncUserTypeOrmModule: LloveTypeOrmModule<DynamicModule> = (
  dataSourceOptions: DataSourceOptions
) =>
  TypeOrmModule.forRootAsync({
    useFactory: () => dataSourceOptions,
  });
