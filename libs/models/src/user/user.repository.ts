import { Shared } from '..';
import { UserEntity } from './user.entity';

type OmitBaseEntity = Shared.OmitBaseEntity;
export type CreateUserInput = Omit<UserEntity, OmitBaseEntity>;
export type UpdateUserInput = Partial<CreateUserInput>;

export type UserRepository = {} & Shared.BaseRepository<
  CreateUserInput,
  UpdateUserInput
>;
