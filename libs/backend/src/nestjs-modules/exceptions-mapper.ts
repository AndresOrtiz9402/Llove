import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpExceptionsMapper {
  constructor(private readonly field: string) {}
  404 = () => new HttpException(`${this.field} not found.`, HttpStatus.NOT_FOUND);
  520 = () => new HttpException(`Unknown Error`, 520);
}
