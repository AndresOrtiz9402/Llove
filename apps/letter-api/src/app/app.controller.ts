import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Letter, Shared } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/letter-generate')
  createLetter(
    @Body(Shared.Infrastructure.Pipes.NestjsSpaceCleanPipe)
    letterDto: Letter.Infrastructure.Dtos.LetterDto
  ) {
    return this.appService.LetterGenerate(letterDto);
  }
}
