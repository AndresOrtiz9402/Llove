import { type Shared } from '..';

export enum LetterTone {
  friendly = 'friendly',
  romantic = 'romantic',
  family = 'family',
}

export type LetterToneType = typeof LetterTone;

export interface LetterTypeEntity extends Shared.BaseEntity {
  isFor: string;
  occasion: string;
  relationship: string;
  tone: LetterToneType;
}
