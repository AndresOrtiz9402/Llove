import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_DATABASE } from '@llove/product-domain/backend';

@Module({
  imports: [CONFIG_DATABASE()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
