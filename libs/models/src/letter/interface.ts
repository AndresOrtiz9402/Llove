import { type OmitBaseEntity, Dependency } from '../shared';
import { type LetterTypeEntity } from '.';

export type CreateLetterInput = Omit<LetterTypeEntity, OmitBaseEntity>;

export type CreateLetterAsyncDependency = Dependency.AsyncDependency<
  {
    userPrompt: CreateLetterInput;
    systemPrompt: string;
  },
  string
>;

type CreateLetter = (input: CreateLetterInput) => Promise<string>;

export interface CreateLetterUseCase {
  createLetter: CreateLetter;
}
