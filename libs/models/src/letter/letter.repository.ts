import { type BaseRepository } from '../shared';
import { type Interface } from '.';

export type LetterRepository = {} & BaseRepository<
  Interface.CreateLetterDto,
  Interface.UpdateLetterDto
>;
