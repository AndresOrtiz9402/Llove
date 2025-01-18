import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Letter, Shared } from '@llove/models';
import { Infrastructure } from '../../../shared';

const {
  isEnumMessage,
  isNotEmptyMessage,
  MultiStringFieldsDecoratorsParamsMaker: MultiStringFields,
} = Infrastructure.ClassValidatorHelpers;

type ILetterDto = Omit<Letter.LetterTypeEntity, Shared.OmitBaseEntity>;

const { LetterTone } = Letter;

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const LetterDtoDecoratorsPrams = new MultiStringFields(
  ['isFor', 'occasion', 'relationship'],
  stringPattern,
  'field cannot contain special characters or start empty'
);

const { isFor, occasion, relationship } = LetterDtoDecoratorsPrams;

export class CreateLetterDto implements ILetterDto {
  @IsNotEmpty(isFor.isNotEmptyMessage)
  @IsString(isFor.isStringMessage)
  @Matches(isFor.matches.pattern, isFor.matches.matchesMessage)
  readonly isFor: string;

  @IsNotEmpty(occasion.isNotEmptyMessage)
  @IsString(occasion.isStringMessage)
  @Matches(occasion.matches.pattern, occasion.matches.matchesMessage)
  readonly occasion: string;

  @IsNotEmpty(relationship.isNotEmptyMessage)
  @IsString(relationship.isStringMessage)
  @Matches(relationship.matches.pattern, relationship.matches.matchesMessage)
  readonly relationship: string;

  @IsNotEmpty(isNotEmptyMessage('tone'))
  @IsEnum(LetterTone, isEnumMessage('tone', LetterTone))
  readonly tone: Letter.LetterToneType;
}
