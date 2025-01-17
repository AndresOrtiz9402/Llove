import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { NestModules } from '@llove/backend';
import { User } from '@llove/product-domain/backend';

const SpaceCleanPipe = NestModules.Pipes.SpaceCleanPipe;

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  createUser(
    @Body(SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return this.appService.userCreate(createUserDto);
  }
}
