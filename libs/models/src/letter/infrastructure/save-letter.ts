import type { CreateLetterOptionInput } from './letter-options-inputs';
import type { CreateLetterInput } from '.';
import type { Letter, LetterOptions } from '..';

export type SaveLetterInput = {
  options: CreateLetterOptionInput;
  letter: Omit<CreateLetterInput, 'letterOptionId'>;
};

export type SaveLetterOutPut = {
  letterOptions: LetterOptions;
  createdLetter: Letter;
};
