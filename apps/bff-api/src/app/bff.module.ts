import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

import { AuthModule } from './auth/auth.module';
import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';
import { NestModules } from '@llove/backend';
import { BFF_ENV } from '../config';

const { HealthModule } = NestModules.Api;

@Global()
@Module({
  imports: [
    AuthModule,
    HealthModule,
    HttpModule.registerAsync({
      useFactory: () => {
        const axiosConfig: AxiosRequestConfig = {
          validateStatus: () => true,
        };
        return {
          ...axiosConfig,
        };
      },
    }),
    LetterModule,
    UserModule,
  ],
  controllers: [],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }],
  exports: [HttpModule, { provide: 'BFF_ENV', useValue: BFF_ENV }],
})
export class BffModule {}
