import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userTypeOrmModule } from '../config';

@Module({
  imports: [userTypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
