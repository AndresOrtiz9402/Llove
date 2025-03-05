import { IAuth } from '@llove/models';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class LogoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((session: IAuth.Session) => {
        const { user } = session;

        if (user) {
          const response = context.switchToHttp().getResponse();

          response.clearCookie('access_token');

          return { statusCode: 200 };
        }

        return { statusCode: 400 };
      })
    );
  }
}
