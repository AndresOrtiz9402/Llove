import type { OmitBaseEntity, Id } from '..';
import { Query } from '.';

type BaseEntity<Entity, Id> = Entity & { id: Id };

type Input<Entity, OmitBase> = {
  [P in Exclude<keyof Entity, OmitBase>]: Entity[P];
};

export type BaseRepository<Entity> = {
  create(input: Input<Entity, OmitBaseEntity>): Promise<BaseEntity<Entity, Id>>;

  deletedById(input: Id): Promise<unknown>;

  getAll(): Promise<BaseEntity<Entity, Id>[]>;

  findOne(input: Partial<Input<Entity, OmitBaseEntity>>): Promise<BaseEntity<Entity, Id>>;

  getById(input: Id): Promise<BaseEntity<Entity, Id>>;

  updateById(id: Id, updateInput: Partial<Input<Entity, OmitBaseEntity>>): Promise<unknown>;

  getMany(queryObj: Query.QueryObj<Entity>): Promise<BaseEntity<Entity, Id>[]>;
};
