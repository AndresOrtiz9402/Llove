import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter as LetterModels } from '@llove/models';
import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../../config';
import { Repositories } from '..';

type LetterOptionsRepository = LetterModels.LetterOptionsRepository;
type LetterRepository = LetterModels.LetterRepository;

const { LetterOptionsRepository, LetterRepository } = Repositories;

const chatCompletionsService = Shared.Infrastructure.Openai.chatCompletionsService;
const { letterCreator, letterGenerator } = Letter.Application.UseCase;

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

  readonly createLetter = letterCreator(this.letterRepository, this.letterOptionsRepository);

  readonly getAll = async () => ({
    letter: await this.letterRepository.getAll(),
    letterOptions: await this.letterOptionsRepository.getAll(),
  });
}
