import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from '..';

const { UserTypeOrmModule } = config;

@Module({
  imports: [UserTypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
