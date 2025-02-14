import { Inject, Injectable } from '@nestjs/common';

import type { ILetter } from '@llove/models';
import { Letter } from '@llove/product-domain/backend';

import { UseCases } from '../../dependency-injection';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type LetterUseCases = UseCases.LetterUseCases;
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;
type LetterQueryObj = Letter.Infrastructure.Typeorm.Repository.LetterQueryObj;

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

  generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return this.letterUseCases.generateLetter(createLetterOptionsDto);
  }

  getAll() {
    return this.letterUseCases.getAll();
  }

  getById(id: number) {
    return this.letterUseCases.getLetterById(id);
  }

  getPage(queryObj: LetterQueryObj) {
    return this.letterUseCases.getLettersPage(queryObj);
  }
}
