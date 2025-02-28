import { type OmitBaseEntity } from '../shared';
import { type User } from '.';

export type CreateUserDto = Omit<User, OmitBaseEntity>;
export type UpdateUserDto = Partial<CreateUserDto>;
export type UserAuthenticationDto = Pick<User, 'email'>;
