import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DataSource } from 'typeorm';

import { ILetter, IShared } from '@llove/models';
import { Letter, Shared } from '@llove/product-domain/backend';
import { GEMINI_API_KEY /* OPENAI_API_KEY */ } from '../../config';
import { Repositories } from '..';
/* import OpenAI from 'openai'; */

//generate letter
type AiService = ILetter.Infrastructure.GenerateLetter.AiService;
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type GeneratedLetter = ILetter.Infrastructure.GenerateLetter.GeneratedLetter;

//save letter
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;
type SaveLetterTransaction = ILetter.SaveLetterTransaction.Transaction;

//get page
type LetterQueryObj = Letter.Infrastructure.Typeorm.Repository.LetterQueryObj;

const { ERROR, SUCCESS } = IShared.Interfaces.SuccessOrError.STATUS;
const { SaveLetterTransaction } = Letter.Infrastructure.Typeorm.Transactions;
const { generateLetter, saveLetter } = Letter.Application;

@Injectable()
export class LetterUseCases {
  private readonly aiService: AiService;
  private readonly saveLetterTransaction: SaveLetterTransaction;

  constructor(
    private readonly letterOptionsRepository: Repositories.LetterOptionsRepository,
    private readonly letterRepository: Repositories.LetterRepository,
    private readonly dataSource: DataSource
  ) {
    this.aiService = new Shared.Infrastructure.Gemini.AiServiceMaker<GeneratedLetter>(
      new GoogleGenerativeAI(GEMINI_API_KEY)
    );
    /* this.aiService = new Shared.Infrastructure.Openai.AiServiceMaker<GeneratedLetter>(
      new OpenAI({ apiKey: OPENAI_API_KEY })
    ); */

    this.saveLetterTransaction = new SaveLetterTransaction(this.dataSource);
  }

  readonly generateLetter = (letterOptions: CreateLetterOptionsDto) => {
    return generateLetter(letterOptions, this.aiService);
  };

  readonly getAll = async () => {
    return await this.letterRepository.getAll();
  };

  readonly getLetterById = async (id: number) => {
    try {
      const letter = await this.letterRepository.getById(id);
      const options = await this.letterOptionsRepository.getById(
        letter.status === SUCCESS ? letter.data.letterOptionId : null
      );

      return {
        options,
        letter,
      };
    } catch (error) {
      return {
        status: ERROR,
        error: (error as Error).message,
      };
    }
  };

  readonly getLettersPage = async (queryObj: LetterQueryObj) =>
    await this.letterRepository.getMany(queryObj);

  readonly saveLetter = (input: SaveLetterInput) => saveLetter(input, this.saveLetterTransaction);
}
