import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@llove/product-domain/backend';

type UserEntity = User.Infrastructure.Typeorm.Entities.UserEntity;

const { UserRepository: IUserRepository } =
  User.Infrastructure.Typeorm.Repository;

export const { UserEntity } = User.Infrastructure.Typeorm.Entities;

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {
    super(repository);
  }
}
