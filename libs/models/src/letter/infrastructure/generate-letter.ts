import { CreateLetterDto, CreateLetterOptionsDto } from '.';
import { AiServiceMaker, Interfaces } from '../../shared';

export type GeneratedLetter = Omit<CreateLetterDto, 'userId' | ' letterOptionId'>;

export type AiService = AiServiceMaker<GeneratedLetter>;

export type GeneratorResponse = Interfaces.SuccessOrError.SuccessOrError<
  string,
  { options: CreateLetterOptionsDto; letter: GeneratedLetter }
>;
