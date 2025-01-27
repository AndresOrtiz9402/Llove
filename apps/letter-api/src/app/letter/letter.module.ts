import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestModules } from '@llove/backend';

import { LETTER_DB_ENV } from '../../config';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';
import {
  CreateLetterUseCase,
  CreateLetterAsyncDependency,
  LetterEntity,
  LetterOptionsEntity,
  LetterOptionsRepository,
  LetterRepository,
} from './providers';

const { database, host, password, port, username, migrations } = LETTER_DB_ENV;

const { AsyncTypeOrmModule } = NestModules.Typeorm;

@Module({
  imports: [
    AsyncTypeOrmModule({
      database,
      host,
      migrations,
      password,
      port,
      username,
    }),
    TypeOrmModule.forFeature([LetterEntity, LetterOptionsEntity]),
  ],
  controllers: [LetterController],
  providers: [
    CreateLetterAsyncDependency,
    CreateLetterUseCase,
    LetterOptionsRepository,
    LetterRepository,
    LetterService,
  ],
})
export class LetterModule {}
