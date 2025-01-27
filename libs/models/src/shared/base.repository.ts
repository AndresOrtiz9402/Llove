import { type Id } from '.';

export type BaseRepository<CreateInput, UpdateInput> = {
  create(input: CreateInput): Promise<object>;
  getById(input: { id: Id; updateInput: UpdateInput }): Promise<object>;
  getAll(): Promise<object>;
  updateById(input: { id: Id }): Promise<object>;
  deletedById(input: { id: Id }): Promise<object>;
};
