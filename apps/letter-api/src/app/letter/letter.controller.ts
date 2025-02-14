import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { LetterService } from './letter.service';

import { ILetter, IShared } from '@llove/models';
import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const { ASC, DESC } = IShared.DataAccess.Query.OrderValues;

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('/all')
  getById() {
    return this.letterService.getAll();
  }

  @Get('')
  getLetters(
    @Query('p', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('l', new DefaultValuePipe(1), ParseIntPipe) limit = 10,
    @Query('ts', new DefaultValuePipe('a')) titleSort = 'a',
    @Query('ds', new DefaultValuePipe('a')) dateSort = 'a',
    @Headers('user-id') userId: string
  ) {
    const queryObj = {
      filter: {
        userId: parseInt(userId),
      },
      limit: limit < 50 ? limit : 10,
      page,
      sort: {
        title: titleSort === 'd' ? DESC : ASC,
        createdAt: dateSort === 'd' ? DESC : ASC,
      },
    };

    return this.letterService.getPage(queryObj);
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
