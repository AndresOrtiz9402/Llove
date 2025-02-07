import { type OmitBaseEntity, type Id } from '.';

type BaseEntity<Entity, Id> = Entity & { id: Id };

type Input<Entity, OmitBase, Id> = {
  [P in Exclude<keyof Entity, OmitBase>]: BaseEntity<Entity, Id>[P];
};

type BaseResponse<Entity, Id> = BaseEntity<Entity, Id> | { status: 'fail'; error: unknown };

export type BaseRepository<Entity> = {
  create(input: Input<Entity, OmitBaseEntity, Id>): Promise<BaseResponse<Entity, Id>>;

  deletedById(input: Id): Promise<{ status: 'success' } | { status: 'fail'; error: unknown }>;

  getAll(): Promise<BaseEntity<Entity, Id>[] | { status: 'fail'; error: unknown }>;

  getById(input: Id): Promise<BaseResponse<Entity, Id>>;

  updateById(
    id: Id,
    updateInput: Partial<Input<Entity, OmitBaseEntity, Id>>
  ): Promise<{ status: 'success'; data: unknown } | { status: 'fail'; error: unknown }>;
};
