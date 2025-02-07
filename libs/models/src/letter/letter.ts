import { type IShared } from '..';

export interface Letter extends IShared.BaseEntity {
  title: string;
  content: string;
  userId: number;
  letterOptionId: number;
}
