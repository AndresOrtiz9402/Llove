import { type shared } from '../..';

type Base = shared.Base;

export interface Letter extends Base {
  title: string;
  content: string;
  userId: number;
  letterTypeId: number;
}
