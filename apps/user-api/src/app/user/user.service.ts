import { Injectable } from '@nestjs/common';

import { Shared } from '@llove/backend';
import { User } from '@llove/product-domain/backend';
import { Repositories } from '../../dependency-injection';
import { IUser } from '@llove/models';

type CreateUserDto = User.Infrastructure.Dtos.CreateUserDto;
type UpdateUserDto = User.Infrastructure.Dtos.UpdateUserDto;
type UserAuthenticationDto = IUser.Infrastructure.UserAuthenticationDto;

const {
  CreateUser: { CREATE_USER },
  DeleteUser: { DELETE_USER },
  GetAllUsers: { GET_ALL_USERS },
  GetUser: { FIND_USER },
  UpdateUser: { UPDATE_USER },
} = User.Application;

const { HandleService } = Shared.Decorators.ServiceHandle;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repositories.UserRepository) {}

  @HandleService(CREATE_USER)
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  @HandleService(DELETE_USER)
  async deleteById(id: number) {
    return await this.userRepository.deletedById(id);
  }

  @HandleService(GET_ALL_USERS)
  async getAll() {
    return await this.userRepository.getAll();
  }

  @HandleService(FIND_USER)
  async findOne(input: UserAuthenticationDto) {
    return await this.userRepository.findOne(input);
  }

  @HandleService(UPDATE_USER)
  async updateById(id: number, updateInput: UpdateUserDto) {
    return await this.userRepository.updateById(id, updateInput);
  }
}
