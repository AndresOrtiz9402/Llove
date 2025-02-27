import { Inject, Injectable } from '@nestjs/common';

import { ILetter } from '@llove/models';
import { Letter } from '@llove/product-domain/backend';
import { Repositories } from '..';

//generate letter
type AiService = ILetter.Infrastructure.GenerateLetter.AiService;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

//save letter
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

//get page
type LetterQueryObj = ILetter.Interfaces.LetterQueryObj;

const {
  GenerateLetter: { generateLetter },
  SaveLetter: { saveLetter },
} = Letter.Application;

@Injectable()
export class LetterUseCases {
  constructor(
    private readonly letterOptionsRepository: Repositories.LetterOptionsRepository,
    private readonly letterRepository: Repositories.LetterRepository,
    @Inject('AiService')
    private readonly aiService: AiService
  ) {}

  readonly generateLetter = (letterOptions: CreateLetterOptionsDto) => {
    return generateLetter(letterOptions, this.aiService);
  };

  readonly getManyLetters = async (queryObj: LetterQueryObj) =>
    await this.letterRepository.getMany(queryObj);

  readonly saveLetter = (input: SaveLetterInput) =>
    saveLetter(input, {
      letterOptionsRepository: this.letterOptionsRepository,
      letterRepository: this.letterRepository,
    });
}
