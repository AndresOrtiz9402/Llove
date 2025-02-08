import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

import type { ILetter } from '@llove/models';
import { Infrastructure } from '../../../shared';

type ICreateLetterDto = ILetter.Infrastructure.CreateLetterDto;

const contentPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s\\;,.!¡¿?]*$/;
const contentMatchMessage = `Invalid input: The 'content' should start with a letter and only contain letters, 
accented characters, spaces, backslashes, semicolons, commas, periods, exclamation marks, and question marks.`;

const titlePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const { title, content } = new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
  ['title', 'content'],
  titlePattern,
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
  @Matches(contentPattern, { message: contentMatchMessage })
  readonly content: string;

  @IsNotEmpty()
  @IsInt()
  readonly userId: number;
}
