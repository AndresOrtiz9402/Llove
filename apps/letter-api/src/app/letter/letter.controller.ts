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

import { ILetter } from '@llove/models';
import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

const { StatusCodeInterceptor } = NestModules.Interceptors;

@UseInterceptors(StatusCodeInterceptor)
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('')
  getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit = 10,
    @Query('titleSort', new DefaultValuePipe('a')) titleSort = 'a',
    @Query('dateSort', new DefaultValuePipe('a')) dateSort = 'a',
    @Headers('user-id') userId: string
  ) {
    const newUserId = parseInt(userId);

    return this.letterService.getManyLetters(newUserId, { dateSort, limit, page, titleSort });
  }

  @Post('')
  async save(
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
