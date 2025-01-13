import { Openai } from '@llove/backend';

import { type Infrastructure } from '../..';

type OpenaiMessage<T> = Openai.OpenaiUseCase<T>;
type ChatCompletionCreateParamsNonStreaming =
  Openai.ChatCompletionCreateParamsNonStreaming;
type LetterDto = Infrastructure.Dtos.LetterDto;

export const openaiSimpleCompletion: OpenaiMessage<string> = async (
  content,
  openai
) => {
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

  const res = JSON.stringify({
    message: completions.choices[0].message.content,
  });

  return res;
};

export const openaiLetterGenerate: OpenaiMessage<LetterDto> = async (
  content,
  openai
) => {
  const prompt = `
    Vas a recibir un JSON con el siguiente formato:

    {
        "isFor": "string" ,
        "occasion": "string", 
        "relationship": "string", 
        "tone": "string",
        "language": "spanish",
    }

    Vas a usar este JSON para generar el contenido para una carta.

    La carta debe tener un membrete, un cuerpo y una despedida.
  `;
  //TODO: add emojis option.
  //TODO: add keywords option.

  const jsonContent = JSON.stringify({ ...content, language: 'spanish' });

  const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: jsonContent,
      },
    ],
  };

  const completions = await Openai.noStreamCompletions(openai, noStreamParams);

  const letterContent = completions.choices[0].message.content;

  const res = JSON.stringify({
    letter: letterContent,
  });

  return res;
};
