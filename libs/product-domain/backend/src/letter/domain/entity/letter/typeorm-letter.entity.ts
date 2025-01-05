import { ILetter } from '@llove/models';
import { Column } from 'typeorm';

import { TypeormBaseEntity } from '../../../../shared';

export class Letter extends TypeormBaseEntity implements ILetter {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  letterTypeId: number;
}
