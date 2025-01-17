import { DeepPartial, Repository } from 'typeorm';

import { Shared } from '@llove/models';

type AsyncProvider<TypeEntity> = Shared.Provider.AsyncProvider<
  DeepPartial<TypeEntity>[],
  string
>;

type AsyncProviderExample = Shared.Provider.AsyncProvider<string, string>;

export class TypeormCreate<TypeEntity> implements AsyncProvider<TypeEntity> {
  constructor(private repository: Repository<TypeEntity>) {}
  async execute(input: DeepPartial<TypeEntity>[]): Promise<string> {
    const newUser = this.repository.create(input);

    const res = JSON.stringify(await this.repository.save(newUser));

    return res;
  }
}

export class TypeormFind implements AsyncProviderExample {
  async execute(input: string): Promise<string> {
    return input;
  }
}
