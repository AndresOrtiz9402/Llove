import { Injectable, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Response } from 'express';
import { Strategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';
import { TokenError } from 'passport-oauth2';

//libs
import { IAuth } from '@llove/models';

//types
type LoginOrRegisterDto = IAuth.LoginOrRegisterDto;

//main | PassportStrategy
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(options: StrategyOptions) {
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { displayName, emails } = profile;

    const email: string = emails[0].value;

    const username: string = displayName;

    const user: LoginOrRegisterDto = {
      email,
      username,
    };

    done(null, user);
  }
}

//error handling
@Catch(TokenError)
export class TokenErrorFilter implements ExceptionFilter {
  catch(exception: TokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      message: 'Bad Request: Invalid token or authentication error',
    });
  }
}
