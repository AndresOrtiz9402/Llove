import type { OmitBaseEntity, Id } from '.';
import { Interfaces } from '.';

type BaseEntity<Entity, Id> = Entity & { id: Id };

type Input<Entity, OmitBase> = {
  [P in Exclude<keyof Entity, OmitBase>]: Entity[P];
};

type SuccessOrError<L, R> = Interfaces.SuccessOrError.SuccessOrError<L, R>;

export type BaseRepository<Entity> = {
  create<L>(
    input: Input<Entity, OmitBaseEntity>
  ): Promise<SuccessOrError<L, BaseEntity<Entity, Id>>>;

  deletedById(input: Id): Promise<SuccessOrError<unknown, unknown>>;

  getAll<L>(): Promise<SuccessOrError<L, BaseEntity<Entity, Id>[]>>;

  getById<L>(input: Id): Promise<SuccessOrError<L, BaseEntity<Entity, Id>>>;

  updateById(
    id: Id,
    updateInput: Partial<Input<Entity, OmitBaseEntity>>
  ): Promise<SuccessOrError<unknown, unknown>>;
};
