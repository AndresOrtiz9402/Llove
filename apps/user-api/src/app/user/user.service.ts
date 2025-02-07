import { Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';

import { UserRepository } from '../../dependency-injection';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findUsers() {
    return await this.userRepository.getAll();
  }

  async findUser(id: number) {
    return await this.userRepository.getById(id);
  }

  async updateUser(id: number, updateInput: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateInput);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deletedById(id);
  }
}
