export interface BaseEntity {
  id: number;
  createdAt: Date;
  deletedAt: Date | null;
}

export type OmitBaseEntity = 'id' | 'createdAt' | 'deletedAt';
