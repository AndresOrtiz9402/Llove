import { Body, Controller, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post('')
  createLetter(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.createLetter(createLetterOptionsDto);
  }
}
