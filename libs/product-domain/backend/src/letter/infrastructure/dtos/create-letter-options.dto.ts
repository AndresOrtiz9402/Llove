import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

import { ILetter } from '@llove/models';
import { Infrastructure } from '../../../shared';

const { isEnumMessage, isNotEmptyMessage } = Infrastructure.ClassValidator.Helpers;

const { LetterTone } = ILetter;

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const { isFor, occasion, relationship } =
  new Infrastructure.ClassValidator.Helpers.MultiIsStringDecoratorParams(
    ['isFor', 'occasion', 'relationship'],
    stringPattern,
    'field cannot contain special characters or start empty'
  );

export class CreateLetterOptionsDto implements ILetter.Infrastructure.CreateLetterOptionsDto {
  @IsNotEmpty(isFor.isNotEmptyMessage)
  @IsString(isFor.isStringMessage)
  @Matches(isFor.matches.pattern, isFor.matches.message)
  readonly isFor: string;

  @IsNotEmpty(occasion.isNotEmptyMessage)
  @IsString(occasion.isStringMessage)
  @Matches(occasion.matches.pattern, occasion.matches.message)
  readonly occasion: string;

  @IsNotEmpty(relationship.isNotEmptyMessage)
  @IsString(relationship.isStringMessage)
  @Matches(relationship.matches.pattern, relationship.matches.message)
  readonly relationship: string;

  @IsNotEmpty(isNotEmptyMessage('tone'))
  @IsEnum(LetterTone, isEnumMessage('tone', LetterTone))
  readonly tone: ILetter.LetterToneOptions;
}
