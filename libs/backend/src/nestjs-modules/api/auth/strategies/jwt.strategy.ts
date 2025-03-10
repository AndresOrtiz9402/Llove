import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

//libs
import { IAuth } from '@llove/models';

//types
type AccessTokenPayload = IAuth.AccessTokenPayload;

export function JwtStrategy(secretOrKey: string | Buffer) {
  @Injectable()
  class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (request: Request) => {
            return request?.cookies?.authorization;
          },
        ]),
        ignoreExpiration: false,
        secretOrKey,
      });
    }

    async validate(payload: AccessTokenPayload) {
      return { sub: payload.sub };
    }
  }

  return JwtStrategy;
}
