import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { Letter } from '@llove/product-domain/backend';

import { Config } from '..';

@Injectable()
export class AppService extends Letter.Application.LetterService {
  constructor() {
    super(new OpenAI({ apiKey: Config.OPENAI_API_KEY }));
  }
}
