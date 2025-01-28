import { Module } from '@nestjs/common';

import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LetterModule, UserModule],
  controllers: [],
  providers: [],
})
export class BffModule {}
