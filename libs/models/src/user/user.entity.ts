import { type Shared } from '..';

type Base = Shared.Base;

export interface UserEntity extends Base {
  name: string;
  email: string;
}

export type OmitUser = 'name' | 'email';
