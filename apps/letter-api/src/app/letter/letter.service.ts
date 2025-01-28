import { Inject, Injectable } from '@nestjs/common';

import { type Letter } from '@llove/product-domain/backend';

import { CreateLetterUseCase } from '../../dependency-injection';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

@Injectable()
export class LetterService {
  constructor(
    @Inject(CreateLetterUseCase)
    private readonly UseCase: CreateLetterUseCase
  ) {}

  createLetter(createLetterDto: CreateLetterOptionsDto) {
    return this.UseCase.createLetter(createLetterDto);
  }
}
