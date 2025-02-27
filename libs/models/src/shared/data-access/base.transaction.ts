export enum TRANSACTION {
  COMMITTED = 'Transaction committed.',
  ROLLED_BACK = 'Transaction rolled back.',
}

export interface Rollback extends Error {
  status: TRANSACTION.ROLLED_BACK;
}

export interface Committed<R> {
  status: TRANSACTION.COMMITTED;
  data: R;
}

export type RollbackOrCommit<R> = Rollback | Committed<R>;
