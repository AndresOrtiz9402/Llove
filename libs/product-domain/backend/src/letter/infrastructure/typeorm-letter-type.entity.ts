import { Column, Entity } from 'typeorm';

import { type Letter } from '@llove/models';
import { TypeormBaseEntity } from '../../shared';

@Entity('letter_type')
export class LetterTypeEntity
  extends TypeormBaseEntity
  implements Letter.Entities.LetterTypeEntity
{
  @Column({ name: 'for', type: 'varchar' })
  for: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;

  @Column({ name: 'relationship', type: 'varchar' })
  relationship: string;

  @Column({ name: 'tone', type: 'varchar' })
  tone: string;
}
