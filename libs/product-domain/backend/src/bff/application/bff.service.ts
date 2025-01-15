import { type Infrastructure as LetterInfrastructure } from '../../letter';
import { type Infrastructure as UserInfrastructure } from '../../user';
import { UseCase } from '.';

type LetterDto = LetterInfrastructure.Dtos.LetterDto;
type CreateUserDto = UserInfrastructure.Dtos.CreateUserDto;

export class BffService {
  constructor(private readonly BFF_ENV: Record<string, URL>) {}

  letterGeneratePetition(LetterDto: LetterDto) {
    //TODO: User validation.

    return UseCase.httpSimplePostRequest(
      LetterDto,
      this.BFF_ENV.LETTER_API_LETTER_GENERATE_URL
    );
  }

  userCreate(createUserDto: CreateUserDto) {
    return UseCase.httpSimplePostRequest(
      createUserDto,
      this.BFF_ENV.USER_API_CREATE_USER_URL
    );
  }
}
