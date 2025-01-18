import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User, Shared } from '@llove/product-domain/backend';
import { Repository } from 'typeorm';

type CreateUserAsyncProvider = User.Application.UseCase.CreateUserAsyncProvider;
type FindUserAsyncProvider = User.Application.UseCase.FindUserAsyncProvider;
type UserEntity = User.Infrastructure.Typeorm.Entities.UserEntity;

const { UserRepository } = User.Application.UseCase;
const { TypeormCreate, TypeormFind } = Shared.Infrastructure.Typeorm.Providers;
export const { UserEntity } = User.Infrastructure.Typeorm.Entities;

@Injectable()
export class TypeormCreateProvider extends TypeormCreate<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>
  ) {
    super(repository);
  }
}

@Injectable()
export class TypeormFindProvider extends TypeormFind {}

@Injectable()
export class UserRepositoryProvider extends UserRepository {
  constructor(
    @Inject('CreateUserAsyncProvider')
    createUserProvider: CreateUserAsyncProvider,
    @Inject('FindUserAsyncProvider')
    findUserAsyncProvider: FindUserAsyncProvider
  ) {
    super(createUserProvider, findUserAsyncProvider);
  }
}
