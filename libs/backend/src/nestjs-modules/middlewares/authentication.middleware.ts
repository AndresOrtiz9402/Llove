import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface NewRequest extends Request {
  session: {
    user: {
      sub: string;
      username: string;
      iat: number;
      exp: number;
    };
  };
}

@Injectable()
export class UserAuthentication implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { access_token } = req.cookies;

      const user = this.jwtService.verify(access_token);

      req.session = { user };
    } catch {
      req.session = { user: null };
    }

    next();
  }
}
