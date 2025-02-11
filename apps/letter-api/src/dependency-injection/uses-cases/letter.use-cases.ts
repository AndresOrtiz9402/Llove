import { Inject, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { ILetter } from '@llove/models';
import { Letter, Shared } from '@llove/product-domain/backend';
import { GEMINI_API_KEY } from '../../config';
import { Repositories } from '..';

type LetterOptionsRepository = ILetter.LetterOptionsRepository;
type LetterRepository = ILetter.LetterRepository;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type AiService = Letter.Application.AiService;

const { LetterOptionsRepository, LetterRepository } = Repositories;
const { makeSaveLetterUseCase: makeCreateLetterUseCase, generateLetter } = Letter.Application;

@Injectable()
export class LetterUseCases {
  private readonly aiService: AiService;
  constructor(
    @Inject(LetterOptionsRepository)
    private readonly letterOptionsRepository: LetterOptionsRepository,

    @Inject(LetterRepository)
    private readonly letterRepository: LetterRepository
  ) {
    this.aiService = new Shared.Infrastructure.Gemini.Service(
      new GoogleGenerativeAI(GEMINI_API_KEY)
    ).generate;
  }

  readonly generateLetter = (letterOptions: CreateLetterOptionsDto) => {
    return generateLetter(letterOptions, this.aiService);
  };

  readonly createLetter = makeCreateLetterUseCase({
    letterRepository: this.letterRepository,
    letterOptionsRepository: this.letterOptionsRepository,
  });

  readonly getLetterById = async (id: number) => {
    try {
      const letter = await this.letterRepository.getById(id);
      const options = await this.letterOptionsRepository.getById(
        letter.status === 'success' ? letter.data.letterOptionId : null
      );

      return {
        options,
        letter,
      };
    } catch (error) {
      return {
        status: 'fail',
        error: (error as Error).message,
      };
    }
  };
}
