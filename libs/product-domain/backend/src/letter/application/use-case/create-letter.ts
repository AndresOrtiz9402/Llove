import { type Letter, type Shared } from '@llove/models';

type ICreateLetter = Letter.Interface.ICreateLetter;

type ICreateLetterUseCase = Letter.Interface.ICreateLetterUseCase;

export type CreateLetterAsyncDependency = Shared.Dependency.AsyncDependency<
  {
    userPrompt: ICreateLetter;
    systemPrompt: string;
  },
  string
>;

export class CreateLetterUseCase implements ICreateLetterUseCase {
  constructor(private dependency: CreateLetterAsyncDependency) {}

  async createLetter(content: Letter.Interface.ICreateLetter): Promise<string> {
    const userPrompt = content;

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

    const input = {
      userPrompt,
      systemPrompt,
    };

    return await this.dependency.execute(input);
  }
}
