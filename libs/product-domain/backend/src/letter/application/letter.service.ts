import OpenAI from 'openai';

import { type Infrastructure } from '..';
import { UseCase } from '.';

export class LetterService {
  constructor(private openai: OpenAI) {}

  LetterGenerate(letterDto: Infrastructure.Dtos.LetterDto) {
    return UseCase.openaiLetterGenerate(letterDto, this.openai);
  }
}
