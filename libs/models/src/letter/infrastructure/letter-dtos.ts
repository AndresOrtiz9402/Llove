import { type OmitBaseEntity } from '../../shared';
import { type Letter } from '..';

export type CreateLetterDto = Omit<Letter, OmitBaseEntity>;
export type UpdateLetterDto = Partial<CreateLetterDto>;
