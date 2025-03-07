import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { BFF_ENV } from '../../config';

import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: BFF_ENV.SECRET_JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [JwtModule, AuthenticationService],
})
export class AuthModule {}
