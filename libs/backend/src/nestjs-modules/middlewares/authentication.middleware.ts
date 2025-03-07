import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import { IAuth } from '@llove/models';

@Injectable()
export class UserAuthentication implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request & { session: { sub: number } }, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.cookies;

      const accessToken: IAuth.AccessTokenPayload = this.jwtService.verify(access_token);

      req.session = { sub: accessToken.sub };

      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

//TODO: Add the refresh token step.
