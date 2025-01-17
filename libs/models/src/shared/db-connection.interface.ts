export interface DbConnectionOptions {
  database: string;
  host: string;
  password: string;
  username: string;
  port: number;
  migrations: string[];
}

export interface DbConnectionInterface<FrameworkModule> {
  (connectionOptions: DbConnectionOptions): FrameworkModule;
}
