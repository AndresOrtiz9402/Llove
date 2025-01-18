import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

@Controller('letter')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create')
  createLetter(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createLetterDto: Letter.Infrastructure.Dtos.CreateLetterDto
  ) {
    return this.appService.createLetter(createLetterDto);
  }
}
