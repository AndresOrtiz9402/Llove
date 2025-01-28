import { Repository } from 'typeorm';

import { type Shared, type User } from '@llove/models';
import { UserEntity } from '../entities';

export type CreateUserDto = User.Interface.CreateUserDto;
export type UpdateUserDto = User.Interface.UpdateUserDto;

export class UserRepository implements User.UserRepository {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async create(input: CreateUserDto): Promise<object> {
    const newUser = this.userRepository.create(input);

    const res = await this.userRepository.save(newUser);

    return res;
  }
  async getById(input: Shared.BaseId): Promise<object> {
    const { id } = input;
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<object> {
    return await this.userRepository.find();
  }

  async updateById(input: UpdateUserDto): Promise<object> {
    const { id, ...updateInput } = input;

    return await this.userRepository.update({ id }, updateInput);
  }

  async deletedById(input: Shared.BaseId): Promise<object> {
    return await this.userRepository.delete(input);
  }
}
