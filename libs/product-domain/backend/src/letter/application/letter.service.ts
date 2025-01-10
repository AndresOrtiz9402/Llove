import OpenAI from 'openai';

import { UseCase } from '.';

export class LetterService {
  constructor(
    private openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  ) {}

  openaiMessage(messages: string) {
    return UseCase.openaiCompletions(messages, this.openai);
  }
}
