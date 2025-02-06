import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('all')
  getAll() {
    return this.letterService.getAll();
  }

  @Post('create')
  create(@Body(NestModules.Pipes.SpaceCleanPipe) inputObj: Letter.Application.UseCase.InputObj) {
    return this.letterService.createLetter(inputObj);
  }

  @Post('generate')
  generate(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createLetterDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.generateLetter(createLetterDto);
  }
}
