import {
  type OpenaiStreamCompletions,
  type OpenaiNoStreamCompletions,
} from './interface';

export const noStreamCompletions: OpenaiNoStreamCompletions = async (
  openai,
  params
) => {
  const completions = await openai.chat.completions.create(params);

  return completions;
};

export const streamCompletions: OpenaiStreamCompletions = async (
  openai,
  params
) => {
  const completions = await openai.chat.completions.create(params);

  return completions;
};
