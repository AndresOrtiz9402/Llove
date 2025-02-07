import { Repository } from 'typeorm';

import { type IUser } from '@llove/models';
import { Infrastructure } from '../../../../shared';
import { type UserEntity } from '../entities';

export class UserRepository
  extends Infrastructure.Typeorm.Repositories.TypeormBaseRepository<UserEntity>
  implements IUser.UserRepository
{
  constructor(private readonly userRepository: Repository<UserEntity>) {
    super(userRepository);
  }
}
