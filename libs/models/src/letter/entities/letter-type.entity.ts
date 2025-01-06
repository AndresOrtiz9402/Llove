import { type Shared } from '../..';

type Base = Shared.Base;

export interface LetterType extends Base {
  for: string;
  occasion: string;
}
