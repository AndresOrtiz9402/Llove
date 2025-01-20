import { Inject, Injectable } from '@nestjs/common';

import { Shared, Letter } from '@llove/product-domain/backend';

import { Config } from '../..';

type CreateLetterDto = Letter.Infrastructure.Dtos.CreateLetterDto;
type BFF_ENV = Config.BFF_ENV;

@Injectable()
export class LetterService {
  constructor(@Inject('BFF_ENV') private BFF_ENV: BFF_ENV) {}

  createLetter(createLetterDto: CreateLetterDto) {
    return Shared.Http.post(
      createLetterDto,
      this.BFF_ENV.LETTER_API_URL + '/create'
    );
  }
}
