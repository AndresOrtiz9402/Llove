import { match, P } from 'ts-pattern';

import { type ILetter } from '@llove/models';

type CreateLetterOptionsDto = ILetter.Infrastructure.CreateLetterOptionsDto;

export type LetterGeneratorResponse =
  | { status: 'error'; error: Error }
  | { status: 'invalid'; error: typeof badResponseMessage }
  | { status: 'success'; content: string };

const badResponseMessage = 'The service returned an invalid response.';

export const letterGenerator = (
  service: (prompt: string) => (optionsObj: CreateLetterOptionsDto) => Promise<string>
) => {
  const prompt = `
      Vas a recibir un JSON con el siguiente formato:

      {
        "isFor": "string" ,
        "occasion": "string", 
        "relationship": "string", 
        "tone": "string",
      }

      Usaras el JSON que has recibido para generar el contenido de una carta.

      La carta debe tener un membrete, un cuerpo y una despedida.

      Debes retornar un JSON con el siguiente formato:

      {
      "status": "success",
      "content": string
      }

      Si durante la generación de la carta ocurre un error debes retornar un JSON usando el siguiente formato:

      {
      "status": "error",
      "error": Error
      }
    `;

  return async (optionsObj: CreateLetterOptionsDto) => {
    const res = JSON.parse(await service(prompt)(optionsObj));

    return match<LetterGeneratorResponse>(res)
      .returnType<LetterGeneratorResponse>()
      .with({ status: 'success', content: P.string }, data => data)
      .with({ status: 'error', error: P._ }, data => data)
      .otherwise(data => ({ status: 'invalid', error: badResponseMessage, data }));
  };
};
