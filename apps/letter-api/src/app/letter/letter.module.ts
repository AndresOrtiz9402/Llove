import { Module } from '@nestjs/common';

import { NestModules } from '@llove/backend';

import { LETTER_DB_ENV } from '../../config';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';
import { CreateLetterUseCase, CreateLetterAsyncDependency } from './providers';

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
  ],
  controllers: [LetterController],
  providers: [CreateLetterAsyncDependency, CreateLetterUseCase, LetterService],
})
export class LetterModule {}
