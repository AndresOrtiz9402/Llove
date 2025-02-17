import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestModules } from '@llove/backend';

import { USER_DB_ENV } from '../../config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Repositories } from '../../dependency-injection';

const { UserEntity, UserRepository } = Repositories;

const { database, host, password, port, username, migrations } = USER_DB_ENV;

const { AsyncTypeOrmModule } = NestModules.Typeorm;

@Module({
  imports: [
    AsyncTypeOrmModule({
      database,
      host,
      password,
      port,
      username,
      migrations,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
