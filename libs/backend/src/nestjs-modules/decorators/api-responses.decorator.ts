import { applyDecorators } from '@nestjs/common';
import { ApiResponseOptions, ApiResponse } from '@nestjs/swagger';

export function ApiResponses(queries: ApiResponseOptions[]) {
  return applyDecorators(...queries.map(options => ApiResponse(options)));
}
