import { SuccessOrError } from '.';

type TransactionSuccessOrError<R> = SuccessOrError.CustomSuccessOrError<string, R>;

export interface BaseTransaction<T, R> {
  execute(input: T): Promise<TransactionSuccessOrError<R>>;
}
