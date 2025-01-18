import { Inject, Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';

type UserRepository = User.Application.UseCase.UserRepository;
type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;

@Injectable()
export class AppService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findUser(id: number) {
    return await this.userRepository.find({ id });
  }
}
