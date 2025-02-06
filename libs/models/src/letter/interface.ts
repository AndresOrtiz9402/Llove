import { type OmitBaseEntity } from '../shared';
import { type LetterEntity, type LetterOptionsEntity } from '.';

//INPUTS INTERFACES
export type CreateLetterOptionsDto = Omit<LetterOptionsEntity, OmitBaseEntity>;
export type UpdateLetterOptionsDto = Partial<CreateLetterOptionsDto>;
export type CreateLetterDto = Omit<LetterEntity, OmitBaseEntity>;
export type UpdateLetterDto = Partial<CreateLetterDto>;
