import { type Shared } from '..';

export interface LetterTypeEntity extends Shared.BaseEntity {
  isfor: string;
  occasion: string;
  relationship: string;
  tone: string;
}
