import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShared } from '@llove/models';

type Result = IShared.Services.ServiceHandle.Result<unknown>;
@Injectable()
export class StatusCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result: Result) => {
        const { statusCode } = result ?? {};

        if (statusCode) {
          const response = context.switchToHttp().getResponse();
          response.status(statusCode);
        }
        return result;
      })
    );
  }
}
