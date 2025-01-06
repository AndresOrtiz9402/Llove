import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entity } from '..';

export const CONFIG_DATABASE = (): DynamicModule =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'users',
    entities: [Entity.UserEntity],
    synchronize: true,
  });
