export type BaseRepository<CreateInput, UpdateInput> = {
  create(input: CreateInput): Promise<object>;
  getById(input: { id: number; updateInput: UpdateInput }): Promise<object>;
  getAll(): Promise<object>;
  updateById(input: { id: number }): Promise<object>;
  deletedById(input: { id: number }): Promise<object>;
};
