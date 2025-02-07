import { type IShared } from '..';

export interface User extends IShared.BaseEntity {
  name: string;
  email: string;
}

export type OmitUser = 'name' | 'email';
