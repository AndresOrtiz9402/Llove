import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../config';

type ICreateLetter = Letter.Infrastructure.Dtos.CreateLetterDto;
type OpenaiChatCompletions = Shared.Openai.OpenaiChatCompletions<ICreateLetter>;

const CreateLetterUseCase = Letter.Application.UseCase.CreateLetterUseCase;
const OpenaiChatCompletions = Shared.Openai
  .OpenaiChatCompletions<ICreateLetter>;

export const OpenaiClientProvider: OpenAI = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

@Injectable()
export class OpenaiChatCompletionsProvider extends OpenaiChatCompletions {
  constructor(@Inject('OpenAI') openai: OpenAI) {
    super(openai);
  }
}

@Injectable()
export class CreateLetterUseCaseProvider extends CreateLetterUseCase {
  constructor(openaiChatCompletions: OpenaiChatCompletionsProvider) {
    super(openaiChatCompletions);
  }
}
