import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { IAuth } from '@llove/models';
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
    @Session() session: IAuth.Session
  ) {
    const userId = session.user.sub.toString();

    return this.letterService.getManyLetters(userId, { limit, page, dateSort, titleSort });
  }

  @Post('')
  save(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.BffSaveLetterDto,
    @Session() session: IAuth.Session
  ) {
    const newSaveLetterDto = {
      options: { ...createLetterOptionsDto.options },
      letter: { ...createLetterOptionsDto.letter, userId: session.user.sub },
    };

    return this.letterService.saveLetter(newSaveLetterDto);
  }

  @Post('generate')
  generate(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.generateLetter(createLetterOptionsDto);
  }
}
