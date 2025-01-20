import { Body, Controller, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
  @Post('create')
  createLetter(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createLetterDto: Letter.Infrastructure.Dtos.CreateLetterDto
  ) {
    return this.letterService.createLetter(createLetterDto);
  }
}
