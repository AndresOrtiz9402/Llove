import { type BaseRepository } from '../shared';
import { type Interface } from '.';

export type UserRepository = {} & BaseRepository<
  Interface.CreateUserDto,
  Interface.UpdateUserDto
>;
