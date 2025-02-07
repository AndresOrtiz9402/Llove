import { Column, Entity } from 'typeorm';

import { type IUser } from '@llove/models';
import { Infrastructure } from '../../../../shared';

const { TypeormBaseEntity } = Infrastructure.Typeorm.Entities;

@Entity({ name: 'users' })
export class UserEntity extends TypeormBaseEntity implements IUser.User {
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;
}
