import { Column, Entity } from 'typeorm';

import { type User } from '@llove/models';
import { Shared } from '../..';

@Entity({ name: 'users' })
export class UserEntity
  extends Shared.TypeormBaseEntity
  implements User.UserEntity
{
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;
}
