import { Module } from '@nestjs/common';
import { WhatsAppModule } from './whats-app/whatsapp.module';

//libs
import { NestModules } from '@llove/backend';

const { HttpSetupModule, HealthModule } = NestModules.Api;

@Module({
  imports: [WhatsAppModule, HttpSetupModule, HealthModule],
})
export class AppModule {}
