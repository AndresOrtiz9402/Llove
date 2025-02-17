import type { OmitBaseEntity, Id } from '..';
import { Interfaces } from '..';
import { Query } from '.';

type BaseEntity<Entity, Id> = Entity & { id: Id };

type Input<Entity, OmitBase> = {
  [P in Exclude<keyof Entity, OmitBase>]: Entity[P];
};

type SuccessOrError<R> = Interfaces.SuccessOrError.SuccessOrError<unknown, R>;

export type BaseRepository<Entity> = {
  create(input: Input<Entity, OmitBaseEntity>): Promise<SuccessOrError<BaseEntity<Entity, Id>>>;

  deletedById(input: Id): Promise<SuccessOrError<unknown>>;

  getAll(): Promise<SuccessOrError<BaseEntity<Entity, Id>[]>>;

  getById(input: Id): Promise<SuccessOrError<BaseEntity<Entity, Id>>>;

  updateById(
    id: Id,
    updateInput: Partial<Input<Entity, OmitBaseEntity>>
  ): Promise<SuccessOrError<unknown>>;

  getMany(queryObj: Query.QueryObj<Entity>): Promise<SuccessOrError<BaseEntity<Entity, Id>[]>>;
};
