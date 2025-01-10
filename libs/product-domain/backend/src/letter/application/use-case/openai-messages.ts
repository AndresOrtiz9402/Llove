import { Openai } from '@llove/backend';

type OpenaiMessage = Openai.OpenaiUseCase;
type ChatCompletionsParams = Openai.ChatCompletionsParams;

export const openaiCompletions: OpenaiMessage = (content, openai) => {
  const chatCompletionsParams: ChatCompletionsParams = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  };

  return Openai.completions(openai, chatCompletionsParams);
};
