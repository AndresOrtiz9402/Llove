import { type Shared } from '..';

export interface UserEntity extends Shared.BaseEntity {
  name: string;
  email: string;
}

export type OmitUser = 'name' | 'email';
