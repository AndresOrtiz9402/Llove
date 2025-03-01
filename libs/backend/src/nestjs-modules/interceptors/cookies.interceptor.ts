import { IShared } from '@llove/models';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type AccessToken = IShared.Interfaces.AccessToken.AccessToken;
type Result = IShared.Services.ServiceHandle.Result<AccessToken>;

export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((result: Result) => {
        const { data, statusCode, error } = result;

        const { access_token } = data;

        if (access_token) {
          response.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
          });
        }

        if (error) return { statusCode, error };

        return { statusCode };
      })
    );
  }
}
