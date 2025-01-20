import { Injectable } from '@nestjs/common';

import { Letter } from '@llove/product-domain/backend';

import { CreateLetterUseCase } from './providers';

type CreateLetterDto = Letter.Infrastructure.Dtos.CreateLetterDto;

@Injectable()
export class LetterService {
  constructor(private readonly UseCase: CreateLetterUseCase) {}

  createLetter(letterDto: CreateLetterDto) {
    return this.UseCase.createLetter(letterDto);
  }
}
