import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@llove/product-domain/backend';

type UserEntity = User.Infrastructure.Typeorm.Entities.UserEntity;

export const { UserEntity } = User.Infrastructure.Typeorm.Entities;

@Injectable()
export class UserRepository extends User.Infrastructure.Typeorm.Repository.UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    injectedRepository: Repository<UserEntity>
  ) {
    super(injectedRepository);
  }
}
