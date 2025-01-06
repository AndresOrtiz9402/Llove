import { type Shared } from '../..';

type Base = Shared.Base;

export interface Letter extends Base {
  title: string;
  content: string;
  userId: number;
  letterTypeId: number;
}
