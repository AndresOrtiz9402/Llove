import { Inject, Injectable } from '@nestjs/common';

import { type ILetter } from '@llove/models';
import { Letter } from '@llove/product-domain/backend';

import { UseCases } from '../../dependency-injection';

type LetterUseCases = UseCases.LetterUseCases;
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

const LetterUseCases = UseCases.LetterUseCases;

@Injectable()
export class LetterService {
  constructor(
    @Inject(LetterUseCases)
    private readonly letterUseCases: LetterUseCases
  ) {}

  saveLetter(createLetterDto: SaveLetterInput) {
    return this.letterUseCases.saveLetter(createLetterDto);
  }

  generateLetter(createLetterOptionsDto: Letter.Infrastructure.Dtos.CreateLetterOptionsDto) {
    return this.letterUseCases.generateLetter(createLetterOptionsDto);
  }

  getById(id: number) {
    return this.letterUseCases.getLetterById(id);
  }
}
