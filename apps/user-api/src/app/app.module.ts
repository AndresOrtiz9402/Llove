import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NestModules } from '@llove/backend';

const { HealthModule } = NestModules.Api;

@Module({
  imports: [HealthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
