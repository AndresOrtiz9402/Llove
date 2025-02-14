export enum TRANSACTION {
  COMMITTED = 'Transaction committed.',
  ROLLED_BACK = 'Transaction rolled back.',
}

export type Rollback<L> = { status: TRANSACTION.ROLLED_BACK; error: L };

export type Committed<R> = { status: TRANSACTION.COMMITTED; data: R };

export type RollbackOrCommit<L, R> = Rollback<L> | Committed<R>;

export interface BaseTransaction<T, L, R> {
  execute(input: T): Promise<RollbackOrCommit<L, R>>;
}
