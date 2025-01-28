import { Module } from '@nestjs/common';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';

import { BFF_ENV } from '../../config';

@Module({
  imports: [],
  controllers: [LetterController],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }, LetterService],
})
export class LetterModule {}
