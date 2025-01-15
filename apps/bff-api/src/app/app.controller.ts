import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { Letter, Shared, User } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('letter-generate')
  letterGeneratePetition(
    @Body(Shared.Infrastructure.Pipes.NestjsSpaceCleanPipe)
    letterDto: Letter.Infrastructure.Dtos.LetterDto
  ) {
    return this.appService.letterGeneratePetition(letterDto);
  }

  @Post('create-user')
  createUser(
    @Body(Shared.Infrastructure.Pipes.NestjsSpaceCleanPipe)
    userDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return this.appService.userCreate(userDto);
  }
}
