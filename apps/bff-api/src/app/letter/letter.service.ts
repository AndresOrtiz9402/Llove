import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import type { ILetter } from '@llove/models';
import { Letter } from '@llove/product-domain/backend';
import { Config } from '../..';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

const { HandleService } = Shared.Decorators.ServiceHandle;

const {
  GenerateLetter: { BFF_GENERATE_LETTER },
  SaveLetter: { BFF_SAVE_LETTER },
  GetMany: { BFF_GET_MANY_LETTERS },
} = Letter.Application;

@Injectable()
export class LetterService {
  constructor(private readonly BFF_ENV: Config.BffEnv, private readonly httpService: HttpService) {}

  @HandleService(BFF_SAVE_LETTER)
  async saveLetter(saveLetter: ILetter.Infrastructure.SaveLetterInput) {
    return (
      await this.httpService.axiosRef.post(this.BFF_ENV.LETTER_API_URL + '/letter/', saveLetter)
    ).data;
  }

  @HandleService(BFF_GENERATE_LETTER)
  async generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return (
      await this.httpService.axiosRef.post(
        this.BFF_ENV.LETTER_API_URL + '/letter/generate',
        createLetterOptionsDto
      )
    ).data;
  }

  @HandleService(BFF_GET_MANY_LETTERS)
  async getManyLetters(userId: string, queryObj: ILetter.Interfaces.GetManyLetterOptions) {
    const query = Shared.Helpers.QueryObj.makeQuery(queryObj);

    return (
      await this.httpService.axiosRef.get(this.BFF_ENV.LETTER_API_URL + '/letter' + query, {
        headers: {
          'user-id': userId,
        },
      })
    ).data;
  }
}
