import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { Infrastructure } from '../../../../shared';

const { TypeormBaseEntity } = Infrastructure.Typeorm.Entities;

@Entity('letter_type')
export class LetterTypeEntity
  extends TypeormBaseEntity
  implements Letter.LetterTypeEntity
{
  @Column({ name: 'is_for', type: 'varchar' })
  isfor: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;

  @Column({ name: 'relationship', type: 'varchar' })
  relationship: string;

  @Column({ name: 'tone', type: 'varchar' })
  tone: string;
}
