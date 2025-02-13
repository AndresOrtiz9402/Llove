import { match } from 'ts-pattern';

import { ILetter, IShared } from '@llove/models';

type CreateLetterOptionsDto = ILetter.Infrastructure.CreateLetterOptionsDto;

type AiService = ILetter.Infrastructure.GenerateLetter.AiService;

type LetterGeneratorResponse = ILetter.Infrastructure.GenerateLetter.GeneratorResponse;

const { ERROR, SUCCESS } = IShared.Interfaces.SuccessOrError.STATUS;

export const generateLetter = async (
  options: CreateLetterOptionsDto,
  aiService: AiService
): Promise<LetterGeneratorResponse> => {
  const letterOptionsStringify = JSON.stringify(options);

  const prompt = `
     ${letterOptionsStringify}

      Usando los datos del JSON anterior genera una carta.

      La carta debe tener un membrete, un cuerpo y una despedida.

      El membrete debe incluir un título y el nombre de la persona a quien va dirigida la carta.

      Debes retornar un JSON usando el siguiente esquema:
      {title: string;
      content: string;}

      Si ocurre algún error devuelve el siguiente mensaje:
      "Error: No se pudo generar la carta."
    `;

  const result = await aiService.generate(prompt);

  return match(result)
    .returnType<LetterGeneratorResponse>()
    .with({ status: SUCCESS }, result => ({
      status: SUCCESS,
      data: { options, letter: result.data },
    }))
    .with({ status: ERROR }, result => result)
    .exhaustive();
};
