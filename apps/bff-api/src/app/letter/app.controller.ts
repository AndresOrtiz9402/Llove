import { Body, Controller, Post } from '@nestjs/common';
import { LetterService } from './app.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post('create')
  createLetter(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.createLetter(createLetterOptionsDto);
  }
}
