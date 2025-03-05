import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import { IAuth } from '@llove/models';

type Session = IAuth.Session;

@Injectable()
export class UserAuthentication implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request & { session: Session }, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.cookies;

      const user = this.jwtService.verify(access_token);

      req.session = { user };

      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
