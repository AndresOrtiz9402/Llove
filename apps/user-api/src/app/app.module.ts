import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config } from '..';
import {
  TypeormFindProvider,
  TypeormCreateProvider,
  UserRepositoryProvider,
  UserEntity,
} from '../providers';

const { UserTypeOrmModule } = config;

const UserEntities = [UserEntity];

@Module({
  imports: [UserTypeOrmModule, TypeOrmModule.forFeature(UserEntities)],
  controllers: [AppController],
  providers: [
    { provide: 'CreateUserAsyncProvider', useClass: TypeormCreateProvider },
    { provide: 'FindUserAsyncProvider', useClass: TypeormFindProvider },
    { provide: 'UserRepository', useClass: UserRepositoryProvider },
    AppService,
  ],
})
export class AppModule {}
