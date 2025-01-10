import { Column, Entity } from 'typeorm';

import { type User } from '@llove/models';
import { infrastructure } from '../../../shared';

const { TypeormBaseEntity } = infrastructure.typeorm;

@Entity({ name: 'users' })
export class UserEntity extends TypeormBaseEntity implements User.UserEntity {
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;
}
