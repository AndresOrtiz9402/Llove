import { Inject, Injectable } from '@nestjs/common';

import { type Letter } from '@llove/product-domain/backend';
import { UseCases } from '../../dependency-injection';

type LetterUseCases = UseCases.LetterUseCases;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type InputObj = Letter.Application.UseCase.InputObj;

const LetterUseCases = UseCases.LetterUseCases;

@Injectable()
export class LetterService {
  constructor(
    @Inject(LetterUseCases)
    private readonly letterUseCases: LetterUseCases
  ) {}

  createLetter(inputObj: InputObj) {
    return this.letterUseCases.createLetter(inputObj);
  }

  generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return this.letterUseCases.generateLetter(createLetterOptionsDto);
  }

  getAll() {
    return this.letterUseCases.getAll();
  }
}
