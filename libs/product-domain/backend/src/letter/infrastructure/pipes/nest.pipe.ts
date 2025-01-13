import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LetterDtoTransformerPipe } from '.';

@Injectable()
export class NestjsLetterDtoTransformerPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'object') {
      const newValue = new LetterDtoTransformerPipe(Object.entries(value));

      return { ...newValue };
    }
    throw new HttpException('Invalid data type.', HttpStatus.BAD_REQUEST);
  }
}
