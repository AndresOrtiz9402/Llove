import { Transactions } from '../shared';
import { SaveLetterInput, SaveLetterOutPut } from './infrastructure';

export type TransactionResults = Transactions.RollbackOrCommit<string, SaveLetterOutPut>;

export type Transaction = Transactions.BaseTransaction<SaveLetterInput, string, SaveLetterOutPut>;
