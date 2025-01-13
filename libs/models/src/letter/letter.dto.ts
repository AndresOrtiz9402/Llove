export enum LetterTone {
  friendly = 'friendly',
  romantic = 'romantic',
  family = 'family',
}

export type LetterToneType = typeof LetterTone;

export enum Language {
  spanish = 'spanish',
}

export type LanguageType = typeof Language;

export interface LetterDto {
  isFor: string;
  occasion: string;
  relationship: string;
  tone: LetterToneType;
  language?: LanguageType;
}
