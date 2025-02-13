import OpenAI from 'openai';

import { IShared } from '@llove/models';
import {
  type OpenaiNoStreamCompletions,
  type ChatCompletionCreateParamsNonStreaming,
} from './interface';

const { ERROR, SUCCESS } = IShared.Interfaces.SuccessOrError.STATUS;

const noStreamCompletions: OpenaiNoStreamCompletions = async (openai, body) => {
  return await openai.chat.completions.create(body);
};

export class AiServiceMaker<R> implements IShared.AiServiceMaker<R> {
  constructor(private readonly openai: OpenAI) {}

  readonly generate: IShared.AiService<R> = async prompt => {
    try {
      const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      };

      const completions = await noStreamCompletions(this.openai, noStreamParams);

      const data = JSON.parse(completions.choices[0].message.content.slice(7, -4));

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error: (error as Error).message };
    }
  };
}
