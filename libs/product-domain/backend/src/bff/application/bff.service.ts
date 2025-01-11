import { UseCase } from '.';

export class BffService {
  constructor(
    private readonly LETTER_API_URL = new URL(process.env.LETTER_API_URL)
  ) {}

  postLetter(message: string) {
    return UseCase.postLetter({ message }, this.LETTER_API_URL);
  }
}
