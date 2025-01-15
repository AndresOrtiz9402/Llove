import { Repository } from 'typeorm';

import { Infrastructure } from '..';

type UserEntity = Infrastructure.Typeorm.Entities.UserEntity;
type CreateUserDto = Infrastructure.Dtos.CreateUserDto;

export class UserService {
  constructor(private usersRepository: Repository<UserEntity>) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }
}
