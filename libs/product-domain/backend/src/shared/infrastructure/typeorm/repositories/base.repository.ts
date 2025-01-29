import { Shared } from '@llove/models';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

type Id = Shared.Id;
type BaseId = Shared.BaseId;
type OmitBaseEntity = Shared.OmitBaseEntity;

export class TypeormBaseRepository<Entity>
  implements Shared.BaseRepository<Entity & BaseId>
{
  constructor(private readonly repository: Repository<Entity & BaseId>) {}

  async create(input: {
    [P in Exclude<keyof Entity, OmitBaseEntity>]: (Entity & BaseId)[P];
  }): Promise<object> {
    const newLetterOptions = this.repository.create(
      input as DeepPartial<Entity & BaseId>
    );

    const res = await this.repository.save(newLetterOptions);

    return res;
  }

  async getAll(): Promise<object> {
    return await this.repository.find();
  }

  async getById(input: Id): Promise<object> {
    return await this.repository.findOne({
      where: { id: input } as FindOptionsWhere<Entity & BaseId>,
    });
  }

  async updateById(input: {
    id: Id;
    updateInput: Partial<{
      [P in Exclude<keyof Entity, OmitBaseEntity>]: (Entity & BaseId)[P];
    }>;
  }): Promise<object> {
    const { id, updateInput } = input;

    return await this.repository.update(
      id,
      updateInput as ObjectLiteral & Entity & BaseId
    );
  }

  async deletedById(input: Id): Promise<object> {
    return await this.repository.delete(input);
  }
}
