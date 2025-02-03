type CreateAt = Date;

type DeleteAt = Date | null;

export interface BaseId {
  readonly id: Id;
}

export interface BaseEntity extends BaseId {
  readonly createdAt: CreateAt;
  deletedAt: DeleteAt;
}

export type Id = number;

export type OmitBaseEntity = 'id' | 'createdAt' | 'deletedAt';
