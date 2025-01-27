import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../../../config';

type CreateLetterOptionsDto = Letter.Infrastructure.Dtos.CreateLetterOptionsDto;

@Injectable()
export class CreateLetterAsyncDependency extends Shared.Openai
  .OpenaiChatCompletions<CreateLetterOptionsDto> {
  constructor() {
    super(
      new OpenAI({
        apiKey: OPENAI_API_KEY,
      })
    );
  }
}

@Injectable()
export class CreateLetterUseCase extends Letter.Application.UseCase
  .CreateLetterUseCase {
  constructor(
    private readonly injectedDependency: CreateLetterAsyncDependency
  ) {
    super(injectedDependency);
  }
}
