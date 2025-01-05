import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { IUserDto } from '@llove/models';

import { ReqFindByIdDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  findUserById(@Body() reqFindByIdDto: ReqFindByIdDto): Promise<IUserDto> {
    const { id } = reqFindByIdDto;
    return this.appService.findById({ id });
  }
}
