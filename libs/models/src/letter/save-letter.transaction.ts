import { DataAccess } from '../shared';
import { SaveLetterOutPut } from './infrastructure';

export type TransactionResults = DataAccess.Transactions.RollbackOrCommit<SaveLetterOutPut>;
