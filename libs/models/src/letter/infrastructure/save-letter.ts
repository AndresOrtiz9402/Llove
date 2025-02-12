import { ILetter } from '@llove/models';
import { CreateLetterOptionInput } from './letter-options-inputs';
import { CreateLetterInput } from '.';

export type SaveLetterInput = {
  options: CreateLetterOptionInput;
  letter: Omit<CreateLetterInput, 'letterOptionId'>;
};

export type SaveLetterOutPut = {
  letterOptions: ILetter.LetterOptions;
  createdLetter: ILetter.Letter;
};
