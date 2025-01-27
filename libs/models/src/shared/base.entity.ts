export type Id = number;

export interface BaseId {
  id: Id;
}

export interface BaseEntity extends BaseId {
  createdAt: Date;
  deletedAt: Date | null;
}

export type OmitBaseEntity = 'id' | 'createdAt' | 'deletedAt';
