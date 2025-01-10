import { type OpenAiCompletions } from './interface';

export const completions: OpenAiCompletions = async (
  openai,
  chatCompletionsParams
) => {
  const completions = await openai.chat.completions.create(
    chatCompletionsParams
  );

  return completions.choices[0].message.content;
};
