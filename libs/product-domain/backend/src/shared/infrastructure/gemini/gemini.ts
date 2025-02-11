import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

import { IShared } from '@llove/models';

type AiService<R> = IShared.Infrastructure.AiService<string, R>;

export class Service<R> {
  private readonly model: GenerativeModel;

  constructor(private readonly genAI: GoogleGenerativeAI) {
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  readonly generate: AiService<R> = async prompt => {
    try {
      const result = (await this.model.generateContent(prompt)).response.text().slice(7, -4);

      const data = JSON.parse(result);

      return { status: 'success', data };
    } catch (error) {
      return { status: 'error', error };
    }
  };
}
