import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

import type { IShared } from '@llove/models';

export class AiServiceMaker<R> implements IShared.Services.AiService.AiServiceMaker<R> {
  private readonly model: GenerativeModel;

  constructor(private readonly genAI: GoogleGenerativeAI) {
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  readonly generate: IShared.Services.AiService.AiService<R> = async prompt => {
    const result = (await this.model.generateContent(prompt)).response.text().slice(7, -4);

    return JSON.parse(result);
  };
}
