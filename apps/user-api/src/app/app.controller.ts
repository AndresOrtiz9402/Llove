import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

import { User } from '@llove/product-domain/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async create(@Body() createUserDto: User.Infrastructure.Dtos.CreateUserDto) {
    try {
      return await this.appService.createUser(createUserDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
    }
  }
}
