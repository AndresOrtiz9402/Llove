import { IBase } from '@llove/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class TypeormBaseEntity implements IBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ type: 'date' })
  deletedAt: Date;
}
