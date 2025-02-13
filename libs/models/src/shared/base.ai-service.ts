import { Interfaces } from '.';

type SuccessOrError<L, R> = Interfaces.SuccessOrError.SuccessOrError<L, R>;

export type AiService<R> = (prompt: string) => Promise<SuccessOrError<string, R>>;

export interface AiServiceMaker<R> {
  generate: AiService<R>;
}
