import { type BaseId, type OmitBaseEntity } from '../shared';
import { type UserEntity } from '.';

export type CreateUserDto = Omit<UserEntity, OmitBaseEntity>;
export type UpdateUserDto = Partial<CreateUserDto> & BaseId;
