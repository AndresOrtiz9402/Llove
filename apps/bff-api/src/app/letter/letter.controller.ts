import { Body, Controller, Post } from '@nestjs/common';
import { LetterService } from './letter.service';

import { NestModules } from '@llove/backend';
import { Letter } from '@llove/product-domain/backend';
import { ILetter } from '@llove/models';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

// TODO: Change for DTO
type CreateLetterOptionsDto = ILetter.Infrastructure.SaveLetterInput;

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post('')
  saveLetter(
    @Body(SpaceCleanPipe)
    createLetterOptionsDto: CreateLetterOptionsDto
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
