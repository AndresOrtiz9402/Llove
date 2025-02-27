import { Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import type { ILetter } from '@llove/models';
import { Letter } from '@llove/product-domain/backend';
import { UseCases } from '../../dependency-injection';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;

const {
  GenerateLetter: { GENERATE_LETTER },
  SaveLetter: { SAVE_LETTER },
  GetMany: { GET_MANY_LETTERS },
} = Letter.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class LetterService {
  constructor(private readonly letterUseCases: UseCases.LetterUseCases) {}

  @HandleService(SAVE_LETTER)
  saveLetter(createLetterDto: SaveLetterInput) {
    return this.letterUseCases.saveLetter(createLetterDto);
  }

  @HandleService(GENERATE_LETTER)
  generateLetter(createLetterOptionsDto: CreateLetterOptionsDto) {
    return this.letterUseCases.generateLetter(createLetterOptionsDto);
  }

  @HandleService(GET_MANY_LETTERS)
  getManyLetters(userId: number, options: ILetter.Interfaces.GetManyLetterOptions) {
    const queryObj = Letter.Application.GetMany.makeLetterApiGetManyInput({ userId, options });

    return this.letterUseCases.getManyLetters(queryObj);
  }
}
