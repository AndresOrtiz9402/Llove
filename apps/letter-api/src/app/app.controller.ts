import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Letter } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/openai-messages')
  getOpenaiMessages(
    @Body() req: Letter.Infrastructure.Dtos.OpenaiCompletionsDto
  ) {
    const messages = req.messages;

    return this.appService.openaiMessage(messages);
  }
}
