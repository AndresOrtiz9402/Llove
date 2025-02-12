import { CreateLetterDto, CreateLetterOptionsDto } from '.';
import { AiServiceMaker, SuccessOrError } from '../../shared';

export type GeneratedLetter = Omit<CreateLetterDto, 'userId' | ' letterOptionId'>;

export type AiService = AiServiceMaker<GeneratedLetter>;

export type GeneratorResponse = SuccessOrError.SuccessOrError<
  string,
  { options: CreateLetterOptionsDto; letter: GeneratedLetter }
>;
