import type { BaseEntity } from '../shared';

export enum LetterTone {
  friendly = 'friendly',
  romantic = 'romantic',
  family = 'family',
}

export type LetterToneOptions = (typeof LetterTone)[keyof typeof LetterTone];

export interface LetterOptions extends BaseEntity {
  isFor: string;
  occasion: string;
  relationship: string;
  tone: LetterToneOptions;
}
