export const isEnumMessage = (field: string, enumObject: object): object => {
  const stringifyEnum = Object.values(enumObject).join("' | '");

  return {
    message: `The ${field} field must be '${stringifyEnum}'.`,
  };
};

export const isNotEmptyMessage = (field: string): object => {
  return { message: `The '${field}' field cannot be empty.` };
};

export const isStringMessage = (field: string): object => {
  return { message: `The '${field}' field must be a string.` };
};

export const matchesMessage = (field: string, message: string): object => {
  return {
    message: `The '${field}' ${message}.`,
  };
};

export class MatchesHelper {
  readonly pattern: RegExp;
  readonly matchesMessage: object;

  constructor(pattern: RegExp, field: string, message: string) {
    this.pattern = pattern;
    this.matchesMessage = matchesMessage(field, message);
  }
}

export class StringFieldsDecoratorsParamsMaker {
  readonly isNotEmptyMessage: object;
  readonly isStringMessage: object;
  readonly matches: MatchesHelper;

  constructor(field: string, pattern: RegExp, matchesMessage: string) {
    this.isNotEmptyMessage = isNotEmptyMessage(field);
    this.isStringMessage = isStringMessage(field);
    this.matches = new MatchesHelper(pattern, field, matchesMessage);
  }
}

export class MultiStringFieldsDecoratorsParamsMaker {
  [key: string]: StringFieldsDecoratorsParamsMaker;
  constructor(fields: string[], pattern: RegExp, matchesMessage: string) {
    fields.forEach((key) => {
      this[key] = new StringFieldsDecoratorsParamsMaker(
        key,
        pattern,
        matchesMessage
      );
    });
  }
}
