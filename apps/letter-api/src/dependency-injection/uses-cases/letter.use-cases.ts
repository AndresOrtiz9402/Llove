import { Inject, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { ILetter } from '@llove/models';
import { Letter, Shared } from '@llove/product-domain/backend';
import { GEMINI_API_KEY, OPENAI_API_KEY } from '../../config';
import { Repositories } from '..';
import { DataSource } from 'typeorm';
import OpenAI from 'openai';

//generate letter
type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;
type AiService = ILetter.Infrastructure.GenerateLetter.AiService;
type GeneratedLetter = ILetter.Infrastructure.GenerateLetter.GeneratedLetter;

//get letter by id
type LetterOptionsRepository = ILetter.LetterOptionsRepository;
type LetterRepository = ILetter.LetterRepository;

//save letter
type SaveLetterInput = ILetter.Infrastructure.SaveLetterInput;
type SaveLetterTransaction = ILetter.SaveLetterTransaction.Transaction;

const { SaveLetterTransaction } = Letter.Infrastructure.Typeorm.Transactions;
const { LetterOptionsRepository, LetterRepository } = Repositories;
const { generateLetter, saveLetter } = Letter.Application;

@Injectable()
export class LetterUseCases {
  private readonly aiService: AiService;
  private readonly saveLetterTransaction: SaveLetterTransaction;

  constructor(
    @Inject(LetterOptionsRepository)
    private readonly letterOptionsRepository: LetterOptionsRepository,

    @Inject(LetterRepository)
    private readonly letterRepository: LetterRepository,
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

  readonly getLetterById = async (id: number) => {
    try {
      const letter = await this.letterRepository.getById(id);
      const options = await this.letterOptionsRepository.getById(
        letter.status === 'success' ? letter.data.letterOptionId : null
      );

      return {
        options,
        letter,
      };
    } catch (error) {
      return {
        status: 'fail',
        error: (error as Error).message,
      };
    }
  };

  readonly saveLetter = (input: SaveLetterInput) => saveLetter(input, this.saveLetterTransaction);
}
