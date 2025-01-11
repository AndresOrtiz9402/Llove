import { Openai } from '@llove/backend';

type OpenaiMessage = Openai.OpenaiUseCase;
type ChatCompletionCreateParamsNonStreaming =
  Openai.ChatCompletionCreateParamsNonStreaming;

export const openaiMessage: OpenaiMessage = async (content, openai) => {
  const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  };

  const completions = await Openai.noStreamCompletions(openai, noStreamParams);

  const completionsJson = JSON.stringify({
    message: completions.choices[0].message.content,
  });

  return completionsJson;
};
