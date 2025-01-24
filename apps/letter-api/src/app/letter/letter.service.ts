import { Injectable } from '@nestjs/common';

import { Letter } from '@llove/product-domain/backend';

import { CreateLetterUseCase } from './providers';

type CreateLetterDto = Letter.Infrastructure.Dtos.CreateLetterDto;

@Injectable()
export class LetterService {
  constructor(private readonly UseCase: CreateLetterUseCase) {}

  createLetter(createLetterDto: CreateLetterDto) {
    return this.UseCase.createLetter(createLetterDto);
  }
}
