import type { DataAccess } from '../shared';
import type { User } from '.';

export type UserRepository = DataAccess.BaseRepository<User>;
