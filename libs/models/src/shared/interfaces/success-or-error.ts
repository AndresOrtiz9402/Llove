export enum STATUS {
  ERROR = 'error',
  SUCCESS = 'success',
}

export type Fail<L> = { status: STATUS.ERROR; error: L };

export type Success<R> = { status: STATUS.SUCCESS; data: R };

export type SuccessOrError<L, R> = Fail<L> | Success<R>;
