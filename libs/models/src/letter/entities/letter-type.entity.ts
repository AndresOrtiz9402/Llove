import { type Shared } from '../..';

export interface LetterTypeEntity extends Shared.BaseEntity {
  for: string;
  occasion: string;
}
