import { CreateLetterDto, CreateLetterOptionsDto } from '.';
import { Services } from '../../shared';

export type GeneratedLetter = Omit<CreateLetterDto, 'userId' | ' letterOptionId'>;

export type AiService = Services.AiService.AiServiceMaker<GeneratedLetter>;

export type GeneratorResponse = { options: CreateLetterOptionsDto; letter: GeneratedLetter };
