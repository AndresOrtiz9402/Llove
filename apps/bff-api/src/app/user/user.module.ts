import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { BFF_ENV } from '../../config';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{ provide: 'BFF_ENV', useValue: BFF_ENV }, UserService],
})
export class UserModule {}
