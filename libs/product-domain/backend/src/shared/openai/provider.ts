import OpenAI from 'openai';

import { type Shared } from '@llove/models';

import {
  type OpenaiNoStreamCompletions,
  type ChatCompletionCreateParamsNonStreaming,
} from './interface';

const noStreamCompletions: OpenaiNoStreamCompletions = async (
  openai,
  params
) => {
  const completions = await openai.chat.completions.create(params);

  return completions;
};

type IOpenaiChatCompletions<ContentInput> = Shared.Provider.AsyncProvider<
  {
    userPrompt: ContentInput;
    systemPrompt: string;
  },
  string
>;

export class OpenaiChatCompletions<ContentInput>
  implements IOpenaiChatCompletions<ContentInput>
{
  constructor(private openai: OpenAI) {}

  async execute(input: {
    userPrompt: ContentInput;
    systemPrompt: string;
  }): Promise<string> {
    const { userPrompt, systemPrompt } = input;

    const jsonContent = JSON.stringify({ ...userPrompt, language: 'spanish' });

    const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: jsonContent,
        },
      ],
    };

    const completions = await noStreamCompletions(this.openai, noStreamParams);

    const letterContent = completions.choices[0].message.content;

    const res = JSON.stringify({
      letter: letterContent,
    });

    return res;
  }
}
