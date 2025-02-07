import { IShared } from '@llove/models';
import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository, UpdateResult } from 'typeorm';

export class TypeormBaseRepository<Entity> implements IShared.BaseRepository<Entity> {
  constructor(private readonly repository: Repository<Entity & { id: number }>) {}

  async create(input: {
    [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: (Entity & { id: number })[P];
  }): Promise<{ status: 'fail'; error: unknown } | (Entity & { id: number })> {
    try {
      const newLetterOptions = this.repository.create(
        input as DeepPartial<Entity & { id: number }>
      );
      return await this.repository.save(newLetterOptions);
    } catch (error) {
      return {
        status: 'fail',
        error,
      };
    }
  }

  async deletedById(
    input: IShared.Id
  ): Promise<{ status: 'success' } | { status: 'fail'; error: unknown }> {
    try {
      await this.repository.delete(input);
      return { status: 'success' };
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async getAll(): Promise<(Entity & { id: number })[] | { status: 'fail'; error: unknown }> {
    try {
      return await this.repository.find();
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async getById(
    input: IShared.Id
  ): Promise<{ status: 'fail'; error: unknown } | (Entity & { id: number })> {
    try {
      return await this.repository.findOne({
        where: { id: input } as FindOptionsWhere<Entity & { id: number }>,
      });
    } catch (error) {
      return {
        status: 'fail',
        error,
      };
    }
  }

  async updateById(
    id: IShared.Id,
    updateInput: Partial<{
      [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: (Entity & { id: number })[P];
    }>
  ): Promise<{ status: 'success'; data: UpdateResult } | { status: 'fail'; error: unknown }> {
    try {
      const data = await this.repository.update(
        id,
        updateInput as ObjectLiteral & Entity & { id: number }
      );

      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
      };
    }
  }
}
