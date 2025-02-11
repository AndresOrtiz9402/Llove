import { match } from 'ts-pattern';

import type { ILetter, IShared } from '@llove/models';

type CreateLetterOptionsDto = ILetter.Infrastructure.CreateLetterOptionsDto;

type Letter = Omit<ILetter.Infrastructure.CreateLetterDto, 'userId' | ' letterOptionId'>;

type LetterGeneratorResponse = IShared.Infrastructure.SuccessOrError<
  string,
  { letterOptions: CreateLetterOptionsDto; letter: Letter }
>;

type AiServiceResponse = IShared.Infrastructure.SuccessOrError<string, Letter>;

export type AiService = (prompt: string) => Promise<AiServiceResponse>;

export const generateLetter = async (
  letterOptions: CreateLetterOptionsDto,
  aiService: AiService
): Promise<LetterGeneratorResponse> => {
  const letterOptionsStringify = JSON.stringify(letterOptions);

  const prompt = `
     ${letterOptionsStringify}

      Usando los datos del JSON anterior genera una carta.

      La carta debe tener un membrete, un cuerpo y una despedida.

      El membrete debe incluir un título y el nombre de la persona a quien va dirigida la carta.

      Debes retornar un JSON usando el siguiente esquema:
      {title: string;
      content: string;}
    `;

  const result = await aiService(prompt);

  return match<AiServiceResponse>(result)
    .returnType<LetterGeneratorResponse>()
    .with({ status: 'success' }, result => ({
      status: 'success',
      data: { letterOptions, letter: result.data },
    }))
    .with({ status: 'error' }, data => data)
    .exhaustive();
};
