import { Inject, Injectable } from '@nestjs/common';

import { type Letter } from '@llove/product-domain/backend';
import { UseCases } from '../../dependency-injection';

type LetterUseCases = UseCases.LetterUseCases;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

const LetterUseCases = UseCases.LetterUseCases;

@Injectable()
export class LetterService {
  constructor(
    @Inject(LetterUseCases)
    private readonly letterUseCases: LetterUseCases
  ) {}

  generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return this.letterUseCases.generateLetter(createLetterOptionsDto);
  }
}
