import { ILetter } from '@llove/models';

type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

type SaveLetterTransaction = ILetter.SaveLetterTransaction.Transaction;

export const saveLetter = async (
  input: SaveLetterInput,
  transactionService: SaveLetterTransaction
) => {
  return await transactionService.execute(input);
};
