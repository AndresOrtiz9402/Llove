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
import { ApiBody, ApiOperation } from '@nestjs/swagger';

//libs
import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';

//modules
import { LetterService } from './letter.service';

//constants
const {
  GET_PAGE_API_OPERATION,
  GET_PAGE_API_QUERIES,
  GET_PAGE_API_RESPONSE,
  SAVE_LETTER_API_BODY,
  SAVE_LETTER_API_OPERATION,
  SAVE_LETTER_API_RESPONSE,
  GENERATE_LETTER_API_BODY,
  GENERATE_LETTER_API_OPERATION,
  GENERATE_LETTER_API_RESPONSE,
} = Letter.Infrastructure.ApiDocs;

const {
  Decorators: { GetUser, ApiQueries, ApiResponses },
  Guards: { JwtAuthGuard },
  Interceptors: { StatusCodeInterceptor },
  Pipes: { SpaceCleanPipe },
} = NestModules;

// Main
@UseInterceptors(StatusCodeInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  //TODO: fix bug.
  @ApiBody(GENERATE_LETTER_API_BODY)
  @ApiOperation(GENERATE_LETTER_API_OPERATION)
  @ApiResponses(GENERATE_LETTER_API_RESPONSE)
  @Post('generate')
  generate(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto
  ) {
    return this.letterService.generateLetter(createLetterOptionsDto);
  }

  @ApiOperation(GET_PAGE_API_OPERATION)
  @ApiQueries(GET_PAGE_API_QUERIES)
  @ApiResponses(GET_PAGE_API_RESPONSE)
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

  @ApiBody(SAVE_LETTER_API_BODY)
  @ApiOperation(SAVE_LETTER_API_OPERATION)
  @ApiResponses(SAVE_LETTER_API_RESPONSE)
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
}
