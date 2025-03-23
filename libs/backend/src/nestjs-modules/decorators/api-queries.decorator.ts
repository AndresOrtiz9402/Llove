import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueries(queries: ApiQueryOptions[]) {
  return applyDecorators(...queries.map(options => ApiQuery(options)));
}
