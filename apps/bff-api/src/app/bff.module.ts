import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

//Libs
import { NestModules } from '@llove/backend';

//Modules
import { AuthModule } from './auth/auth.module';
import { HttpSetupModule } from './http/http.module';
import { LetterModule } from './letter/letter.module';
import { UserModule } from './user/user.module';
import { EnvModule } from './env/env.module';

const { HealthModule } = NestModules.Api;
const { UserAuthentication } = NestModules.Middlewares;

@Global()
@Module({
  imports: [AuthModule, EnvModule, HealthModule, HttpSetupModule, LetterModule, UserModule],
})
export class BffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthentication).exclude('auth/login', 'auth/register').forRoutes('*');
  }
}
