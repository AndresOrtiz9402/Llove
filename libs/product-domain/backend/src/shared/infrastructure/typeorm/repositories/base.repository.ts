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
type Fail<L> = IShared.Interfaces.SuccessOrError.Fail<L>;
type QueryObj<Entity> = IShared.DataAccess.Query.QueryObj<Entity>;
type Success<R> = IShared.Interfaces.SuccessOrError.Success<R>;

const { SUCCESS, ERROR } = IShared.Interfaces.SuccessOrError.STATUS;

export class TypeormBaseRepository<Entity> implements BaseRepository<Entity> {
  constructor(private readonly repository: Repository<Entity & { id: number }>) {}

  async create(input: {
    [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P];
  }): Promise<Fail<unknown> | Success<Entity & { id: number }>> {
    try {
      const newEntity = this.repository.create(input as DeepPartial<Entity & { id: number }>);
      const data = await this.repository.save(newEntity);

      if (!data) return { status: ERROR, error: '404' };

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  }

  async deletedById(input: IShared.Id): Promise<Fail<unknown> | Success<DeleteResult>> {
    try {
      const data = await this.repository.delete(input);

      if (!data) return { status: ERROR, error: '404' };

      return { status: SUCCESS, data: data as DeleteResult };
    } catch (error) {
      return { status: ERROR, error };
    }
  }

  async getAll(): Promise<Fail<unknown> | Success<(Entity & { id: number })[]>> {
    try {
      const data = await this.repository.find();

      if (!data) return { status: ERROR, error: '404' };

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  }

  async getById(input: IShared.Id): Promise<Success<Entity & { id: number }> | Fail<unknown>> {
    try {
      const data = await this.repository.findOne({
        where: { id: input } as FindOptionsWhere<Entity & { id: number }>,
      });

      if (!data) return { status: ERROR, error: '404' };

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  }

  async getPage(
    queryObj: QueryObj<Entity>
  ): Promise<Fail<unknown> | Success<(Entity & { id: number })[]>> {
    try {
      const { page, limit, sort, filter } = queryObj;

      const skip = (page - 1) * limit;

      const data = await this.repository.find({
        order: sort as FindOptionsOrder<Entity & { id: number }>,
        skip,
        take: limit,
        where: filter as FindOptionsWhere<Entity & { id: number }>,
      });

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  }

  async updateById(
    id: IShared.Id,
    updateInput: Partial<{ [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P] }>
  ): Promise<Fail<unknown> | Success<UpdateResult>> {
    try {
      const data = await this.repository.update(
        id,
        updateInput as ObjectLiteral & Entity & { id: number }
      );

      if (!data) return { status: ERROR, error: '404' };

      return { status: SUCCESS, data };
    } catch (error) {
      return { status: ERROR, error };
    }
  }
}
