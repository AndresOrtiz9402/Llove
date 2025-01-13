import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Letter } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('letter-generate')
  letterGeneratePetition(
    @Body(Letter.Infrastructure.Pipes.NestjsLetterDtoTransformerPipe)
    letterDto: Letter.Infrastructure.Dtos.LetterDto
  ) {
    return this.appService.letterGeneratePetition(letterDto);
  }
}
