import { Module } from '@nestjs/common';
import { LetterController } from './app.controller';
import { LetterService } from './app.service';

import { BFF_ENV } from '../../config';

@Module({
  imports: [],
  controllers: [LetterController],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }, LetterService],
})
export class LetterModule {}
