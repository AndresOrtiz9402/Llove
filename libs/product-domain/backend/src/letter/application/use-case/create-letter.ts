import { type Letter } from '@llove/models';

type CreateLetterInput = Letter.Interface.CreateLetterInput;
type CreateLetterAsyncDependency = Letter.Interface.CreateLetterAsyncDependency;

export class CreateLetterUseCase
  implements Letter.Interface.CreateLetterUseCase
{
  constructor(private dependency: CreateLetterAsyncDependency) {}

  async createLetter(input: CreateLetterInput): Promise<string> {
    const userPrompt = input;

    const systemPrompt = `
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

    const newInput = {
      userPrompt,
      systemPrompt,
    };

    return await this.dependency.execute(newInput);
  }
}
