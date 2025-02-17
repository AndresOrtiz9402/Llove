import { Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';

import { Repositories } from '../../dependency-injection';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repositories.UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id: number) {
    return await this.userRepository.getById(id);
  }

  async updateById(id: number, updateInput: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateInput);
  }

  async deleteById(id: number) {
    return await this.userRepository.deletedById(id);
  }
}
