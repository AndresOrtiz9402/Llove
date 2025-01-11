import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Bff } from '@llove/product-domain/backend';

type PostLetterDto = Bff.Infrastructure.Dtos.PostLetterDto;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('post-letter')
  postLetter(@Body() req: PostLetterDto) {
    const { message } = req;
    return this.appService.postLetter(message);
  }
}
