import { type Infrastructure as LetterInfrastructure } from '../../letter';
import { UseCase } from '.';

export class BffService {
  constructor(private readonly BFF_ENV: Record<string, URL>) {}

  letterGeneratePetition(LetterDto: LetterInfrastructure.Dtos.LetterDto) {
    //TODO: User validation.

    return UseCase.httpSimplePostRequest(
      LetterDto,
      this.BFF_ENV.LETTER_API_LETTER_GENERATE_URL
    );
  }
}
