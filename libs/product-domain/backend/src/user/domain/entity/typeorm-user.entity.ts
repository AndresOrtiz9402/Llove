import { IUser } from '@llove/models';
import { Column, Entity } from 'typeorm';

import { TypeormBaseEntity } from '../../../shared';

@Entity({ name: 'users' })
export class User extends TypeormBaseEntity implements IUser {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;
}
