import { Module } from '@nestjs/common';

import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';
import { NestModules } from '@llove/backend';

const { HealthModule } = NestModules.Api;

@Module({
  imports: [HealthModule, LetterModule, UserModule],
  controllers: [],
  providers: [],
})
export class BffModule {}
