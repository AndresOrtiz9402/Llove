import { DataAccess } from '../shared';
import { SaveLetterInput, SaveLetterOutPut } from './infrastructure';

export type TransactionResults = DataAccess.Transactions.RollbackOrCommit<string, SaveLetterOutPut>;

export type Transaction = DataAccess.Transactions.BaseTransaction<
  SaveLetterInput,
  string,
  SaveLetterOutPut
>;
