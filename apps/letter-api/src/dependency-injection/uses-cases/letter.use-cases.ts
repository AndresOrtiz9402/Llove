import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { ILetter } from '@llove/models';
import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../../config';
import { Repositories } from '..';

type LetterOptionsRepository = ILetter.LetterOptionsRepository;
type LetterRepository = ILetter.LetterRepository;

const { LetterOptionsRepository, LetterRepository } = Repositories;

const chatCompletionsService = Shared.Infrastructure.Openai.chatCompletionsService;
const { letterGenerator, makeSaveLetterUseCase: makeCreateLetterUseCase } = Letter.Application;

@Injectable()
export class LetterUseCases {
  constructor(
    @Inject(LetterOptionsRepository)
    private readonly letterOptionsRepository: LetterOptionsRepository,
    @Inject(LetterRepository)
    private readonly letterRepository: LetterRepository
  ) {}

  readonly generateLetter = letterGenerator(
    chatCompletionsService(new OpenAI({ apiKey: OPENAI_API_KEY }))
  );

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
