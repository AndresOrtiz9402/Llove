import { type OmitBaseEntity } from '../../shared';
import { type LetterOptions } from '..';

export type CreateLetterOptionsDto = Omit<LetterOptions, OmitBaseEntity>;
export type UpdateLetterOptionsDto = Partial<CreateLetterOptionsDto>;
