import { Inject, Injectable } from '@nestjs/common';

import { Letter } from '@llove/product-domain/backend';

type CreateLetterUseCase = Letter.Application.UseCase.CreateLetterUseCase;
type CreateLetterDto = Letter.Infrastructure.Dtos.CreateLetterDto;

@Injectable()
export class AppService {
  constructor(
    @Inject('CreateLetterUseCase')
    private readonly UseCase: CreateLetterUseCase
  ) {}

  createLetter(letterDto: CreateLetterDto) {
    return this.UseCase.createLetter(letterDto);
  }
}
