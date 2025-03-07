import { IAuth, IShared } from '@llove/models';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Credentials = IAuth.Credentials;
type Result = IShared.Services.ServiceHandle.Result<Credentials>;

export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result: Result) => {
        const { data, statusCode, error } = result;

        if (statusCode === 200) {
          const { accessToken, refreshToken, session } = data;

          const setCookie = (name: string, value: unknown, maxAge: number) => {
            const response = context.switchToHttp().getResponse();

            response.cookie(name, value, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge,
            });
          };

          const longMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

          const shortMaxAge = 60 * 60 * 1000; // 1 hour

          setCookie('access_token', accessToken, shortMaxAge);
          setCookie('refresh_token', refreshToken, longMaxAge);
          setCookie('session', session, longMaxAge);
        }

        if (error) return { statusCode, error };

        return { statusCode };
      })
    );
  }
}
