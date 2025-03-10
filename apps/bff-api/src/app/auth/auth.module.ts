import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

//libs
import { NestModules } from '@llove/backend';

// modules
import { BFF_ENV } from '../../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

//constants
const { JwtStrategy, GoogleStrategy } = NestModules.Api.Auth.Strategies;

const googleSecrets = {
  clientID: BFF_ENV.GOOGLE_CLIENT_ID,
  clientSecret: BFF_ENV.GOOGLE_CLIENT_SECRET,
  callbackURL: BFF_ENV.GOOGLE_CALLBACK_URL,
};

const jwtSecret = BFF_ENV.JWT_SECRET_KEY;

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy(jwtSecret),
    {
      provide: GoogleStrategy,
      useValue: new GoogleStrategy({
        ...googleSecrets,
        scope: ['email', 'profile'],
      }),
    },
  ],
})
export class AuthModule {}
