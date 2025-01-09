import { DataSourceOptions } from 'typeorm';

export interface LloveDataSourceOptions {
  database: string;
  host: string;
  password: string;
  username: string;
  port: number;
}

export interface LloveDataSourceConfig {
  (connectionOptions: LloveDataSourceOptions): DataSourceOptions;
}

export interface LloveTypeOrmModule<FrameworkInterface> {
  (dataSourceOptions: DataSourceOptions): FrameworkInterface;
}
