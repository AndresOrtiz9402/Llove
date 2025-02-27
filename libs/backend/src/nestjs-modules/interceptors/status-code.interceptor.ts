import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Decorators } from '../../shared';

@Injectable()
export class StatusCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof Decorators.ServiceHandle.Result) {
          const response = context.switchToHttp().getResponse();
          response.status(data.statusCode);
        }
        return data;
      })
    );
  }
}
