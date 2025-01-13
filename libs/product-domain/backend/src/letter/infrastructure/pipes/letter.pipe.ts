//Responsibility: Transform.

export class LetterDtoTransformerPipe {
  [keys: string]: unknown;
  constructor(set: [string, unknown][]) {
    set.forEach((array) => {
      this[array[0]] =
        typeof array[1] === 'string'
          ? array[1].replace(/\s+/g, ' ').trim()
          : array[1];
    });
  }
}
