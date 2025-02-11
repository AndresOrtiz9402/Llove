import { SuccessOrError } from '.';

export type AiService<L, R> = (prompt: string) => Promise<SuccessOrError<L, R>>;
