import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BFF_ENV } from '../../config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }, AppService],
})
export class UserApiModule {}
