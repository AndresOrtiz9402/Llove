import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../../../config';

type ICreateLetterDto = Letter.Infrastructure.Dtos.CreateLetterDto;

const ICreateLetterUseCase = Letter.Application.UseCase.CreateLetterUseCase;

const IOpenaiChatCompletions = Shared.Openai
  .OpenaiChatCompletions<ICreateLetterDto>;

export const OpenaiClient: OpenAI = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

@Injectable()
export class OpenaiChatCompletions extends IOpenaiChatCompletions {
  constructor(@Inject('OpenaiClient') private readonly openaiClient: OpenAI) {
    super(openaiClient);
  }
}

@Injectable()
export class CreateLetterUseCase extends ICreateLetterUseCase {
  constructor(private readonly openaiDependency: OpenaiChatCompletions) {
    super(openaiDependency);
  }
}
