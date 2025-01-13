import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { SpaceCleanPipe } from '.';

@Injectable()
export class NestjsSpaceCleanPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'object') {
      const newValue = new SpaceCleanPipe(Object.entries(value));

      return { ...newValue };
    }
    throw new HttpException('Invalid data type.', HttpStatus.BAD_REQUEST);
  }
}
