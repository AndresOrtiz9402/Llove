import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Letter } from '@llove/models';

//Responsibility: Validation.

type ILetterDto = Letter.LetterDto;

const { LetterTone } = Letter;

const letterToneString = Object.values(LetterTone).join("' | '");

const isNotEmptyMessage = (field: string): object => {
  return { message: `The '${field}' field cannot be empty.` };
};

const isStringMessage = (field: string): object => {
  return { message: `The '${field}' field must be a string` };
};

const matchesNotEmptyStringPattern =
  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

const matchesMessage = (field: string): object => {
  return {
    message: `The '${field}' field cannot contain special characters or start empty.`,
  };
};

const isEnumMessage = (field: string): object => {
  return {
    message: `The ${field} field must be '${letterToneString}'.`,
  };
};

class DtosMatches {
  readonly pattern: RegExp;
  readonly matchesMessage: object;

  constructor(pattern: RegExp, field: string) {
    this.pattern = pattern;
    this.matchesMessage = matchesMessage(field);
  }
}

class LetterDtoStringFieldsDecoratorsParams {
  readonly isNotEmptyMessage: object;
  readonly isStringMessage: object;
  readonly matches: DtosMatches;

  constructor(field: string, pattern: RegExp) {
    this.isNotEmptyMessage = isNotEmptyMessage(field);
    this.isStringMessage = isStringMessage(field);
    this.matches = new DtosMatches(pattern, field);
  }
}

class DtoDecoratorsParams {
  [key: string]: LetterDtoStringFieldsDecoratorsParams;
  constructor(
    fields: string[] = ['isFor', 'occasion', 'relationship'],
    pattern: RegExp = matchesNotEmptyStringPattern
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
  @IsEnum(LetterTone, isEnumMessage('tone'))
  readonly tone: Letter.LetterToneType;
}
