import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Helpers } from '../../shared';

const { StringObjectPropertiesSpaceCleaner } = Helpers;

@Injectable()
export class SpaceCleanPipe implements PipeTransform {
  transform(value: unknown) {
    if (typeof value === 'object') {
      const newValue = new StringObjectPropertiesSpaceCleaner(
        Object.entries(value)
      );

      return { ...newValue };
    }
    throw new HttpException('Invalid data type.', HttpStatus.BAD_REQUEST);
  }
}
