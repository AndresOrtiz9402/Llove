import { SuccessOrError } from '.';

export type AiService<R> = (prompt: string) => Promise<SuccessOrError.SuccessOrError<string, R>>;

export interface AiServiceMaker<R> {
  generate: AiService<R>;
}
