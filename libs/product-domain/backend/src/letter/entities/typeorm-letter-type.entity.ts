import { Letter } from '@llove/models';
import { Shared } from '../..';
import { Column, Entity } from 'typeorm';

@Entity('letter_type')
export class LetterTypeEntity
  extends Shared.TypeormBaseEntity
  implements Letter.Entities.LetterTypeEntity
{
  @Column({ name: 'for', type: 'varchar' })
  for: string;

  @Column({ name: 'occasion', type: 'varchar' })
  occasion: string;
}
