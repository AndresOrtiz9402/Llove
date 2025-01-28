import { Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';

import { UserRepository } from '../../dependency-injection';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findUsers() {
    return await this.userRepository.getAll();
  }
}
