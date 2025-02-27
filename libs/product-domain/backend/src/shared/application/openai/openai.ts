import OpenAI from 'openai';

import type { IShared } from '@llove/models';
import {
  type OpenaiNoStreamCompletions,
  type ChatCompletionCreateParamsNonStreaming,
} from './interface';

const noStreamCompletions: OpenaiNoStreamCompletions = async (openai, body) => {
  return await openai.chat.completions.create(body);
};

export class AiServiceMaker<R> implements IShared.Services.AiService.AiServiceMaker<R> {
  constructor(private readonly openai: OpenAI) {}

  readonly generate: IShared.Services.AiService.AiService<R> = async prompt => {
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

    return JSON.parse(completions.choices[0].message.content.slice(7, -4));
  };
}
