import { Inject, Injectable } from '@nestjs/common';

import { type Letter } from '@llove/product-domain/backend';

import {
  CreateLetterUseCase,
  LetterOptionsRepository,
  LetterRepository,
} from './providers';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

@Injectable()
export class LetterService {
  constructor(
    @Inject(CreateLetterUseCase)
    private readonly UseCase: CreateLetterUseCase,
    @Inject(LetterOptionsRepository)
    private readonly letterOptionsRepository: LetterOptionsRepository,
    @Inject(LetterRepository)
    private readonly letterRepository: LetterRepository
  ) {}

  createLetter(createLetterDto: CreateLetterOptionsDto) {
    return this.UseCase.createLetter(createLetterDto);
  }
}
