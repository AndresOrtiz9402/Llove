import { Module } from '@nestjs/common';

import { LetterApiModule } from './letter-api/app.module';
import { UserApiModule } from './user-api/app.module';

@Module({
  imports: [LetterApiModule, UserApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
