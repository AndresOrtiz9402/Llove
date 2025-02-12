export type Fail<L> = { status: 'error'; error: L };

export type Success<R> = { status: 'success'; data: R };

export type SuccessOrError<L, R> = Fail<L> | Success<R>;

export type CustomFail<L> = { status: string; error: L };

export type CustomSuccess<R> = { status: string; data: R };

export type CustomSuccessOrError<L, R> = CustomFail<L> | CustomSuccess<R>;
