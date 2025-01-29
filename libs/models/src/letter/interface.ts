import { type OmitBaseEntity, type Dependency } from '../shared';
import { type LetterEntity, type LetterOptionsEntity } from '.';

//INPUTS INTERFACES
export type CreateLetterOptionsDto = Omit<LetterOptionsEntity, OmitBaseEntity>;
export type UpdateLetterOptionsDto = Partial<CreateLetterOptionsDto>;
export type CreateLetterDto = Omit<LetterEntity, OmitBaseEntity>;
export type UpdateLetterDto = Partial<CreateLetterDto>;

//DEPENDENCY INJECTION INTERFACES
export type CreateLetterAsyncDependency = Dependency.AsyncDependency<
  {
    userPrompt: CreateLetterOptionsDto;
    systemPrompt: string;
  },
  string
>;

//USE CASE INTERFACES
type CreateLetter = (input: CreateLetterOptionsDto) => Promise<string>;
export interface CreateLetterUseCase {
  createLetter: CreateLetter;
}
