import { Module } from '@nestjs/common';
import { LetterModule } from './letter/letter.module';
import { NestModules } from '@llove/backend';

const { HealthModule } = NestModules.Api;

@Module({
  imports: [HealthModule, LetterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
