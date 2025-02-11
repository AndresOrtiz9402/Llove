type Fail<L> = { status: 'error'; error: L };

type Success<R> = { status: 'success'; data: R };

export type SuccessOrError<L, R> = Fail<L> | Success<R>;
