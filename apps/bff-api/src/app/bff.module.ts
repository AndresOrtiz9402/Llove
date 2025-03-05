import { HttpModule } from '@nestjs/axios';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { NestModules } from '@llove/backend';
import { BFF_ENV } from '../config';
import { AuthModule } from './auth/auth.module';
import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';

const { HealthModule } = NestModules.Api;
const { UserAuthentication } = NestModules.Middlewares;

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
    JwtModule.register({
      global: true,
      secret: BFF_ENV.SECRET_JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    LetterModule,
    PassportModule,
    UserModule,
  ],
  controllers: [],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }],
  exports: [{ provide: 'BFF_ENV', useValue: BFF_ENV }, HttpModule],
})
export class BffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthentication).exclude('auth/login', 'auth/register').forRoutes('*');
  }
}

//TODO: Determine if the csurf middleware will be used.
