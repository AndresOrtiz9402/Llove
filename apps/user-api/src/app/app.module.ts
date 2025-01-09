import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTypeOrmModule } from '../config';

@Module({
  imports: [UserTypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
