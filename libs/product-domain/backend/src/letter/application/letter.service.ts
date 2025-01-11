import OpenAI from 'openai';

import { UseCase } from '.';

export class LetterService {
  constructor(
    private openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  ) {}

  openaiMessage(message: string) {
    return UseCase.openaiMessage(message, this.openai);
  }
}
