import OpenAI from 'openai';

import {
  type OpenaiNoStreamCompletions,
  type ChatCompletionCreateParamsNonStreaming,
} from './interface';

const noStreamCompletions: OpenaiNoStreamCompletions = async (openai, body) => {
  return await openai.chat.completions.create(body);
};

export const chatCompletionsService =
  (openai: OpenAI) =>
  (systemContent: string) =>
  async <UserContent>(userContent: UserContent) => {
    const userContentJSON = JSON.stringify({ ...userContent });

    const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemContent },
        {
          role: 'user',
          content: userContentJSON,
        },
      ],
    };

    const completions = await noStreamCompletions(openai, noStreamParams);

    return completions.choices[0].message.content;
  };
