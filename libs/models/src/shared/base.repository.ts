import { type OmitBaseEntity, type Id } from '.';

type CreateInput<Entity> = Omit<Entity, OmitBaseEntity>;
type UpdateInput<Entity> = Partial<CreateInput<Entity>>;

export type BaseRepository<Entity> = {
  create(input: CreateInput<Entity>): Promise<object>;
  getAll(): Promise<object>;
  getById(input: Id): Promise<object>;
  updateById(input: { id: Id; updateInput: UpdateInput<Entity> }): Promise<object>;
  deletedById(input: Id): Promise<object>;
};
