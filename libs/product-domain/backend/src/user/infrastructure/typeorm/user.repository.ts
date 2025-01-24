import { Repository } from 'typeorm';

import { User } from '@llove/models';
import { UserEntity } from './entities';

export type CreateUserInput = User.Repository.CreateUserInput;
export type UpdateUserInput = User.Repository.UpdateUserInput;

export class UserRepository implements User.Repository.UserRepository {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async create(input: CreateUserInput): Promise<object> {
    const newUser = this.userRepository.create(input);

    const res = await this.userRepository.save(newUser);

    return res;
  }
  async getById(input: { id: number }): Promise<object> {
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
  async updateById(input: {
    id: number;
    updateInput: UpdateUserInput;
  }): Promise<object> {
    const { id, updateInput } = input;

    return await this.userRepository.update({ id }, updateInput);
  }
  async deletedById(input: { id: number }): Promise<object> {
    return await this.userRepository.delete(input);
  }
}
