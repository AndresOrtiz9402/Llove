import { Inject, Injectable } from '@nestjs/common';

import { ILetter } from '@llove/models';
import { Shared, Letter } from '@llove/product-domain/backend';

import { Config } from '../..';

type BFF_ENV = Config.BFF_ENV;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

@Injectable()
export class LetterService {
  constructor(@Inject('BFF_ENV') private BFF_ENV: BFF_ENV) {}

  saveLetter(saveLetter: ILetter.Infrastructure.SaveLetterInput) {
    return Shared.Infrastructure.Http.post(saveLetter, this.BFF_ENV.LETTER_API_URL + '/letter/');
  }

  generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return Shared.Infrastructure.Http.post(
      createLetterOptionsDto,
      this.BFF_ENV.LETTER_API_URL + '/letter/generate'
    );
  }

  async getById(id: number) {
    return (await fetch(this.BFF_ENV.LETTER_API_URL + `/letter/${id}`)).json();
  }

  async getPage(userId: string, query: string) {
    return (
      await fetch(this.BFF_ENV.LETTER_API_URL + '/letter' + query, {
        headers: {
          'user-id': userId,
        },
      })
    ).json();
  }
}
