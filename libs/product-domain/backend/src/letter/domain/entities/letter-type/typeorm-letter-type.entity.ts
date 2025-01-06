import { ILetterType } from '@llove/models';
import { Column } from 'typeorm';

import { TypeormBaseEntity } from '../../../../shared';

export class LetterType extends TypeormBaseEntity implements ILetterType {
  @Column({ type: 'varchar' })
  for: string;

  @Column({ type: 'varchar' })
  occasion: string;
}
