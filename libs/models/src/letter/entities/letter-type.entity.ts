import { type shared } from '../..';

type Base = shared.Base;

export interface LetterType extends Base {
  for: string;
  occasion: string;
}
