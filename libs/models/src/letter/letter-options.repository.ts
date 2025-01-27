import { type BaseRepository } from '../shared';
import { type Interface } from '.';

export type LetterOptionsRepository = {} & BaseRepository<
  Interface.CreateLetterOptionsDto,
  Interface.UpdateLetterOptionsDto
>;
