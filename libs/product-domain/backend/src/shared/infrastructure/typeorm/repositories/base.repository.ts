import { IShared } from '@llove/models';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
  DeleteResult,
  FindOptionsOrder,
} from 'typeorm';

type BaseRepository<Entity> = IShared.DataAccess.BaseRepository<Entity>;
type QueryObj<Entity> = IShared.DataAccess.Query.QueryObj<Entity>;

export class TypeormBaseRepository<Entity> implements BaseRepository<Entity> {
  constructor(private readonly repository: Repository<Entity & { id: number }>) {}

  async create(input: {
    [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P];
  }): Promise<Entity & { id: number }> {
    const newEntity = this.repository.create(input as DeepPartial<Entity & { id: number }>);
    return await this.repository.save(newEntity);
  }

  async deletedById(input: IShared.Id): Promise<DeleteResult> {
    return await this.repository.delete(input);
  }

  async findOne(
    input: Partial<{ [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P] }>
  ): Promise<Entity & { id: number }> {
    return await this.repository.findOne({
      where: input as FindOptionsWhere<Entity & { id: number }>,
    });
  }

  async getAll(): Promise<(Entity & { id: number })[]> {
    return await this.repository.find();
  }

  async getById(input: IShared.Id): Promise<Entity & { id: number }> {
    return await this.repository.findOne({
      where: { id: input } as FindOptionsWhere<Entity & { id: number }>,
    });
  }

  async getMany(queryObj: QueryObj<Entity>): Promise<(Entity & { id: number })[]> {
    const { page, limit, sort, filter } = queryObj;

    const skip = (page - 1) * limit;

    return await this.repository.find({
      order: sort as FindOptionsOrder<Entity & { id: number }>,
      skip,
      take: limit,
      where: filter as FindOptionsWhere<Entity & { id: number }>,
    });
  }

  async updateById(
    id: IShared.Id,
    updateInput: Partial<{ [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P] }>
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updateInput as ObjectLiteral & Entity & { id: number });
  }
}
