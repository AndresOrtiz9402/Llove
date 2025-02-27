import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const { StatusCodeInterceptor } = NestModules.Interceptors;

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

@UseInterceptors(StatusCodeInterceptor)
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('')
  getPage(
    @Query('l', new DefaultValuePipe(1), ParseIntPipe) limit = 10,
    @Query('p', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('ds', new DefaultValuePipe('a')) dateSort = 'a',
    @Query('ts', new DefaultValuePipe('a')) titleSort = 'a',
    @Headers('user-id') userId: string
  ) {
    return this.letterService.getManyLetters(userId, { limit, page, dateSort, titleSort });
  }

  @Post('')
  save(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.SaveLetterDto
  ) {
    return this.letterService.saveLetter(createLetterOptionsDto);
  }

  @Post('generate')
  generate(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.generateLetter(createLetterOptionsDto);
  }
}
