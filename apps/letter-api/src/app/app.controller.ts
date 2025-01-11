import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Letter } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/openai-messages')
  getOpenaiMessages(
    @Body() req: Letter.Infrastructure.Dtos.OpenaiCompletionsDto
  ) {
    const { message } = req;

    return this.appService.openaiMessage(message);
  }
}
