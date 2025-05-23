import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { IShared } from '@llove/models';

type DbConnectionOptions = IShared.DbConnection.DbConnectionOptions;
type DbDataSourceOptions = (connectionOptions: DbConnectionOptions) => DataSourceOptions;
type DbConnectionInterface = IShared.DbConnection.DbConnectionInterface<DynamicModule>;

const dataSourceOptions: DbDataSourceOptions = (connectionOptions: DbConnectionOptions) => {
  const { database, host, password, port, username, migrations } = connectionOptions;

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

export const AsyncTypeOrmModule: DbConnectionInterface = (
  connectionOptions: DbConnectionOptions
) => {
  const Options: DataSourceOptions = dataSourceOptions(connectionOptions);

  return TypeOrmModule.forRootAsync({
    useFactory: () => Options,
  });
};
