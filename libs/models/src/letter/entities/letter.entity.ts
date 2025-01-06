import { type Shared } from '../..';

export interface LetterEntity extends Shared.BaseEntity {
  title: string;
  content: string;
  userId: number;
  letterTypeId: number;
}
