import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

// TODO: Change for DTO

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get(':id')
  getLetterById(@Param('id', ParseIntPipe) id: number) {
    return this.letterService.getById(id);
  }

  @Post('')
  saveLetter(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.SaveLetterDto
  ) {
    return this.letterService.saveLetter(createLetterOptionsDto);
  }

  @Post('generate')
  generateLetter(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.generateLetter(createLetterOptionsDto);
  }
}
