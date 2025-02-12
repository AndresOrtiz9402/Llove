import { SuccessOrError, Transactions } from '../shared';
import { SaveLetterInput, SaveLetterOutPut } from './infrastructure';

export type TransactionResults =
  | SuccessOrError.CustomFail<string>
  | SuccessOrError.CustomSuccess<SaveLetterOutPut>;

export type Transaction = Transactions.BaseTransaction<SaveLetterInput, SaveLetterOutPut>;
