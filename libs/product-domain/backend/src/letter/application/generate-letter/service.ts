import type { ILetter, IShared } from '@llove/models';

type AiService = ILetter.Infrastructure.GenerateLetter.AiService;
type AiServiceError = IShared.Services.AiService.AiServiceError;
type CreateLetterOptionsDto = ILetter.Infrastructure.CreateLetterOptionsDto;
type GeneratedLetter = ILetter.Infrastructure.GenerateLetter.GeneratedLetter;
type LetterGenerationResponse = ILetter.Infrastructure.GenerateLetter.LetterGenerationResponse;

const contentPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s\\;,.!¡¿?]*$/;

const titlePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

export const generateLetter = async (
  options: CreateLetterOptionsDto,
  aiService: AiService
): Promise<LetterGenerationResponse> => {
  const letterOptionsStringify = JSON.stringify(options);

  const prompt = `
     ${letterOptionsStringify}

      Usando los datos del JSON anterior genera una carta.

      La carta debe tener un membrete, un cuerpo y una despedida simple sin el nombre del remitente.

      El membrete debe incluir un título y el nombre de la persona a quien va dirigida la carta.

      Debes retornar un JSON usando el siguiente esquema:
      {title: string válido en la siguiente RegExp: ${titlePattern};
      content: string  válido en la siguiente RegExp: ${contentPattern};}

      Si ocurre algún error retorna un JSON con el siguiente esquema:
      {error: string;}
    `;

  const letter = await aiService.generate(prompt);

  if ((letter as AiServiceError)?.error) throw new Error((letter as AiServiceError).error);

  return {
    options,
    letter: letter as GeneratedLetter,
  };
};
