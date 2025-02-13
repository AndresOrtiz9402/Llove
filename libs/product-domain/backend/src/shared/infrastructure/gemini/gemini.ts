import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

import { IShared } from '@llove/models';

const { ERROR, SUCCESS } = IShared.Interfaces.SuccessOrError.STATUS;

export class AiServiceMaker<R> implements IShared.AiServiceMaker<R> {
  private readonly model: GenerativeModel;

  constructor(private readonly genAI: GoogleGenerativeAI) {
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  readonly generate: IShared.AiService<R> = async prompt => {
    try {
      const result = (await this.model.generateContent(prompt)).response.text().slice(7, -4);

      const data = JSON.parse(result);

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  };
}
