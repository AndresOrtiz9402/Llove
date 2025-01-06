import { type shared } from '..';

type Base = shared.Base;

export interface UserEntity extends Base {
  name: string;
  email: string;
}

export type IOmitUser = 'name' | 'email';
