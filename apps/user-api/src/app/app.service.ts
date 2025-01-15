import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@llove/product-domain/backend';

const { Entities } = User.Infrastructure.Typeorm;

type UserEntity = User.Infrastructure.Typeorm.Entities.UserEntity;

@Injectable()
export class AppService extends User.Application.UserService {
  constructor(
    @InjectRepository(Entities.UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super(userRepository);
  }
}
