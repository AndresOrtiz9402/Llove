import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { User } from '@llove/product-domain/backend';

import { NestModules } from '@llove/backend';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async create(
    @Body(NestModules.Pipes.SpaceCleanPipe)
    createUserDto: User.Infrastructure.Dtos.CreateUserDto
  ) {
    return await this.appService.createUser(createUserDto);
  }
}
