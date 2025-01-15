import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from '@llove/product-domain/backend';
import { config } from '..';

const { UserTypeOrmModule } = config;
const { Entities } = User.Infrastructure.Typeorm;

const UserEntities = [Entities.UserEntity];

@Module({
  imports: [UserTypeOrmModule, TypeOrmModule.forFeature(UserEntities)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
