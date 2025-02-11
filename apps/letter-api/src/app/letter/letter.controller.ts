import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { ILetter } from '@llove/models';
import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.letterService.getById(id);
  }

  @Post('')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createLetterDto: ILetter.Infrastructure.SaveLetterInput
  ) {
    return this.letterService.saveLetter(createLetterDto);
  }

  @Post('generate')
  async generate(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createLetterDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return await this.letterService.generateLetter(createLetterDto);
  }
}
