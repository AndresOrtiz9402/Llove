import { GoogleGenerativeAI } from '@google/generative-ai';
import { NestModules } from '@llove/backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shared } from '@llove/product-domain/backend';
import { LETTER_DB_ENV, GEMINI_API_KEY } from '../../config';
import { UseCases, Repositories } from '../../dependency-injection';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';

const LetterUseCases = UseCases.LetterUseCases;

const { LetterEntity, LetterOptionsEntity, LetterOptionsRepository, LetterRepository } =
  Repositories;

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
    {
      provide: 'AiService',
      useFactory: () => {
        return new Shared.Infrastructure.AiServices.Gemini.AiServiceMaker(
          new GoogleGenerativeAI(GEMINI_API_KEY)
        );
      },
    },
    LetterRepository,
    LetterOptionsRepository,
    LetterUseCases,
    LetterService,
  ],
})
export class LetterModule {}
