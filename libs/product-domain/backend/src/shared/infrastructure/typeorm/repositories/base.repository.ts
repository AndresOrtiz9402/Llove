import { IShared } from '@llove/models';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';

export class TypeormBaseRepository<Entity> implements IShared.BaseRepository<Entity> {
  constructor(private readonly repository: Repository<Entity & { id: number }>) {}
  async create(input: { [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P] }): Promise<
    { status: 'fail'; error: unknown } | { status: 'success'; data: Entity & { id: number } }
  > {
    try {
      const newEntity = this.repository.create(input as DeepPartial<Entity & { id: number }>);
      const data = await this.repository.save(newEntity);

      if (!data) return { status: 'fail', error: '404' };

      return { status: 'success', data };
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async deletedById(
    input: IShared.Id
  ): Promise<{ status: 'success'; data: DeleteResult } | { status: 'fail'; error: unknown }> {
    try {
      const data = await this.repository.delete(input);

      if (!data) return { status: 'fail', error: '404' };

      return { status: 'success', data };
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async getAll(): Promise<
    { status: 'success'; data: (Entity & { id: number })[] } | { status: 'fail'; error: unknown }
  > {
    try {
      const data = await this.repository.find();

      if (!data) return { status: 'fail', error: '404' };

      return { status: 'success', data };
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async getById(
    input: IShared.Id
  ): Promise<
    { status: 'fail'; error: unknown } | { status: 'success'; data: Entity & { id: number } }
  > {
    try {
      const data = await this.repository.findOne({
        where: { id: input } as FindOptionsWhere<Entity & { id: number }>,
      });

      if (!data) return { status: 'fail', error: '404' };

      return { status: 'success', data };
    } catch (error) {
      return { status: 'fail', error };
    }
  }

  async updateById(
    id: IShared.Id,
    updateInput: Partial<{ [P in Exclude<keyof Entity, IShared.OmitBaseEntity>]: Entity[P] }>
  ): Promise<{ status: 'success'; data: UpdateResult } | { status: 'fail'; error: unknown }> {
    try {
      const data = await this.repository.update(
        id,
        updateInput as ObjectLiteral & Entity & { id: number }
      );

      if (!data) return { status: 'fail', error: '404' };

      return { status: 'success', data };
    } catch (error) {
      return { status: 'fail', error };
    }
  }
}
