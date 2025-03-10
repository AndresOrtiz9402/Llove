import { IAuth, IShared } from '@llove/models';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//types
type Credentials = IAuth.Credentials;
type Result = IShared.Services.ServiceHandle.Result<Credentials>;

//constants
const { ACCESS_TOKEN_EXPIRATION, SESSION_EXPIRATION } = IAuth.AuthConstants;

/**
 * The login interceptor.
 *
 * It gets the accessToken and the session from the returned instance
 * of the Result class and sets them in the cookies.
 */
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result: Result) => {
        const { data, statusCode, error } = result;

        if (statusCode === 200) {
          const response = context.switchToHttp().getResponse();

          const { accessToken, session } = data;

          const setCookie = (name: string, value: unknown, maxAge: number) => {
            response.cookie(name, value, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge,
            });
          };

          setCookie('authorization', accessToken, ACCESS_TOKEN_EXPIRATION);
          setCookie('session', session, SESSION_EXPIRATION);
        }

        if (error) return { statusCode, error };

        return { statusCode };
      })
    );
  }
}
