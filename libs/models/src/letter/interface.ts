import { type OmitBaseEntity } from '../shared';
import { type LetterTypeEntity } from '.';

export type ICreateLetter = Omit<LetterTypeEntity, OmitBaseEntity>;

export interface ICreateLetterUseCase {
  createLetter(content: ICreateLetter): Promise<string>;
}
