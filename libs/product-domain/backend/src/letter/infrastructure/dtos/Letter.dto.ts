import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Letter, Shared } from '@llove/models';
import { Infrastructure } from '../../../shared';

const { isEnumMessage, isNotEmptyMessage, isStringMessage, MatchesHelper } =
  Infrastructure.ClassValidatorHelpers;

type IMachesHelper = Infrastructure.ClassValidatorHelpers.MatchesHelper;

type ILetterDto = Omit<Letter.LetterTypeEntity, Shared.OmitBaseEntity>;

const { LetterTone } = Letter;

const stringPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

class LetterDtoStringFieldsDecoratorsParams {
  readonly isNotEmptyMessage: object;
  readonly isStringMessage: object;
  readonly matches: IMachesHelper;

  constructor(field: string, pattern: RegExp) {
    this.isNotEmptyMessage = isNotEmptyMessage(field);
    this.isStringMessage = isStringMessage(field);
    this.matches = new MatchesHelper(
      pattern,
      field,
      'field cannot contain special characters or start empty'
    );
  }
}

class DtoDecoratorsParams {
  [key: string]: LetterDtoStringFieldsDecoratorsParams;
  constructor(
    fields: string[] = ['isFor', 'occasion', 'relationship'],
    pattern: RegExp = stringPattern
  ) {
    fields.forEach((key) => {
      this[key] = new LetterDtoStringFieldsDecoratorsParams(key, pattern);
    });
  }
}

const LetterDtoDecoratorsPrams = new DtoDecoratorsParams();

const { isFor, occasion, relationship } = LetterDtoDecoratorsPrams;

export class OpenaiCompletionsDto {
  @IsString()
  message: string;
}

export class LetterDto implements ILetterDto {
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
