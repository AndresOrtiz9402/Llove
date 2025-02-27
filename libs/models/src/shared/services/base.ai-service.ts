export type AiServiceError = { error: string };

export type AiService<R> = (prompt: string) => Promise<AiServiceError | R>;

export interface AiServiceMaker<R> {
  generate: AiService<R>;
}
