import { Module } from '@nestjs/common';

//Libs
import { NestModules } from '@llove/backend';

//Modules
import { AuthModule } from './auth/auth.module';
import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';
import { BffEnv } from '../config';

const { HealthModule, GlobalProvidersModule, HttpSetupModule } = NestModules.Api;

@Module({
  imports: [
    AuthModule,
    GlobalProvidersModule.register(BffEnv),
    HealthModule,
    HttpSetupModule,
    LetterModule,
    UserModule,
  ],
})
export class BffModule {}
