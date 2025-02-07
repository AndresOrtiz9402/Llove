import { type Letter } from '..';
import type { CreateInput } from '../../shared/base.input';
import { CreateLetterOptionInput } from './letter-options-inputs';

export type CreateLetterInput = CreateInput<Letter>;

export type SaveLetterInput = {
  options: CreateLetterOptionInput;
  letter: Omit<CreateLetterInput, 'letterOptionId'>;
};
