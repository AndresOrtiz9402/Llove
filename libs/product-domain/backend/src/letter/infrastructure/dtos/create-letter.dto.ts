import { IsInt, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

import type { ILetter } from '@llove/models';
import { Infrastructure } from '../../../shared';

type ICreateLetterDto = ILetter.Infrastructure.CreateLetterDto;

const contentPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s\\;,.!¡¿?]*$/;
const contentMatchMessage = `Invalid input: The 'content' should start with a letter and only contain letters, 
accented characters, spaces, backslashes, semicolons, commas, periods, exclamation marks, and question marks.`;

const { title, content } = new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
  ['title', 'content'],
  contentPattern,
  'field cannot contain special characters or start empty'
);

export class CreateLetterDto implements ICreateLetterDto {
  letterOptionId: number;
  @IsNotEmpty(title.isNotEmptyMessage)
  @IsString(title.isStringMessage)
  @Matches(title.matches.pattern, title.matches.message)
  readonly title: string;

  @IsNotEmpty(content.isNotEmptyMessage)
  @IsString(content.isStringMessage)
  @MaxLength(100)
  @Matches(content.matches.pattern, content.matches.message)
  readonly content: string;

  @IsNotEmpty()
  @IsInt()
  readonly userId: number;
}

export class BffCreateLetterDto implements ICreateLetterDto {
  letterOptionId: number;
  @IsNotEmpty(title.isNotEmptyMessage)
  @IsString(title.isStringMessage)
  @Matches(title.matches.pattern, title.matches.message)
  readonly title: string;

  @IsNotEmpty(content.isNotEmptyMessage)
  @IsString(content.isStringMessage)
  @Matches(contentPattern, { message: contentMatchMessage })
  readonly content: string;

  userId: number;
}
