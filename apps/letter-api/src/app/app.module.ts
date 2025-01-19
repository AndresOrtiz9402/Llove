import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  CreateLetterUseCaseProvider,
  OpenaiChatCompletionsProvider,
  OpenaiClientProvider,
} from '../providers';
import { LetterTypeOrmModule } from '../config';
@Module({
  imports: [LetterTypeOrmModule],
  controllers: [AppController],
  providers: [
    { provide: 'OpenAI', useValue: OpenaiClientProvider },
    OpenaiChatCompletionsProvider,
    { provide: 'CreateLetterUseCase', useClass: CreateLetterUseCaseProvider },
    AppService,
  ],
})
export class AppModule {}
