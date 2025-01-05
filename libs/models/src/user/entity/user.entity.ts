import { IBase } from '../..';

export interface IUser extends IBase {
  name: string;
  email: string;
}

export type IOmitUser = 'name' | 'email';
