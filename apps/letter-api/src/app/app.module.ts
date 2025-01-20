import { Module } from '@nestjs/common';
import { LetterModule } from './letter/letter.module';

@Module({
  imports: [LetterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
