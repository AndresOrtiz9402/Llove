import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import type { ILetter } from '@llove/models';
import { Infrastructure } from '../../../shared';

type ICreateLetterDto = ILetter.Infrastructure.CreateLetterDto;

const contentPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s\\;,.!¡¿?]*$/;

const { title, content } = new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
  ['title', 'content'],
  contentPattern,
  'field cannot contain special characters or start empty'
);

export class CreateLetterDto implements ICreateLetterDto {
  letterOptionId: number;
  @IsNotEmpty(title.isNotEmptyMessage)
  @IsString(title.isStringMessage)
  @MaxLength(100)
  readonly title: string;

  @IsNotEmpty(content.isNotEmptyMessage)
  @IsString(content.isStringMessage)
  readonly content: string;

  @IsNotEmpty()
  @IsInt()
  readonly userId: number;
}

export class BffCreateLetterDto implements ICreateLetterDto {
  letterOptionId: number;
  @IsNotEmpty(title.isNotEmptyMessage)
  @IsString(title.isStringMessage)
  @MaxLength(100)
  readonly title: string;

  @IsNotEmpty(content.isNotEmptyMessage)
  @IsString(content.isStringMessage)
  readonly content: string;

  userId: number;
}
