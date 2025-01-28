import { type OmitBaseEntity, type BaseId } from '.';

type CreateInput<Entity> = Omit<Entity, OmitBaseEntity>;
type UpdateInput<Entity> = Partial<CreateInput<Entity>> & BaseId;

export type BaseRepository<Entity> = {
  create(input: CreateInput<Entity>): Promise<object>;
  getAll(): Promise<object>;
  getById(input: BaseId): Promise<object>;
  updateById(input: UpdateInput<Entity>): Promise<object>;
  deletedById(input: BaseId): Promise<object>;
};
