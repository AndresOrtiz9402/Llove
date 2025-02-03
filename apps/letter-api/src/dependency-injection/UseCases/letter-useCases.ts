import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter, Shared } from '@llove/product-domain/backend';
import { OPENAI_API_KEY } from '../../config';

const letterGenerator = Letter.Application.UseCase.letterGenerator;
const ChatCompletionsService = Shared.Infrastructure.Openai.ChatCompletionsService;

@Injectable()
export class LetterUseCases {
  readonly generateLetter = letterGenerator(
    ChatCompletionsService(new OpenAI({ apiKey: OPENAI_API_KEY }))
  );
}
