import { Type } from 'class-transformer';

import type { ILetter } from '@llove/models';
import { CreateLetterOptionsDto, CreateLetterDto, BffCreateLetterDto } from './';
import { ValidateNested } from 'class-validator';

export class SaveLetterDto implements ILetter.Infrastructure.SaveLetterInput {
  @ValidateNested()
  @Type(() => CreateLetterOptionsDto)
  options: CreateLetterOptionsDto;

  @ValidateNested()
  @Type(() => CreateLetterDto)
  letter: CreateLetterDto;
}

export class BffSaveLetterDto implements ILetter.Infrastructure.SaveLetterInput {
  @ValidateNested()
  @Type(() => CreateLetterOptionsDto)
  options: CreateLetterOptionsDto;

  @ValidateNested()
  @Type(() => BffCreateLetterDto)
  letter: BffCreateLetterDto;
}
