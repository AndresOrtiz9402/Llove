import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../..';

export const CONFIG_DATABASE = (): DynamicModule =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'users',
    entities: [User],
    synchronize: true,
  });
