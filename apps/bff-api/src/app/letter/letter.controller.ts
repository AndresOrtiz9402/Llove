import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

//libs
import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

//modules
import { LetterService } from './letter.service';

//constants
const {
  Decorators: { GetUser },
  Guards: { JwtAuthGuard },
  Interceptors: { StatusCodeInterceptor },
  Pipes: { SpaceCleanPipe },
} = NestModules;

//controller
@UseInterceptors(StatusCodeInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('')
  getPage(
    @Query('l', new DefaultValuePipe(1), ParseIntPipe) limit = 10,
    @Query('p', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('ds', new DefaultValuePipe('a')) dateSort = 'a',
    @Query('ts', new DefaultValuePipe('a')) titleSort = 'a',
    @GetUser('sub') userId: number
  ) {
    return this.letterService.getManyLetters(userId.toString(), {
      limit,
      page,
      dateSort,
      titleSort,
    });
  }

  @Post('')
  save(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.BffSaveLetterDto,
    @GetUser('sub') userId: number
  ) {
    const newSaveLetterDto = {
      options: { ...createLetterOptionsDto.options },
      letter: { ...createLetterOptionsDto.letter, userId },
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
