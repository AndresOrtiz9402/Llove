import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter, Shared } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

const { QueryObj } = Shared.Infrastructure.Http;

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('')
  getLetters(
    @Query() query: { p: 1; l: 10; ft: string; ts: 'a'; ds: 'a' },
    @Headers('user-id') userId: string
  ) {
    const newQuery = QueryObj.makeQuery({
      p: query?.p ?? 1,
      l: query?.l ?? 10,
      ft: query?.ft,
      ts: query?.ts ?? 'a',
      ds: query?.ds ?? 'a',
    });

    return this.letterService.getPage(userId, newQuery);
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
