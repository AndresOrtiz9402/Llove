import { Shared, User } from '@llove/models';

export type ICreateUser = User.Interface.ICreateUser;
export type IFindUser = User.Interface.IFindUser;

type IUserRepository = User.Repository.IUserRepository;

export type CreateUserAsyncProvider = Shared.Provider.AsyncProvider<
  ICreateUser,
  string
>;
export type FindUserAsyncProvider = Shared.Provider.AsyncProvider<
  IFindUser,
  string
>;

export class UserRepository implements IUserRepository {
  constructor(
    private readonly createUserProvider: CreateUserAsyncProvider,
    private readonly findUserProvider: FindUserAsyncProvider
  ) {}

  async create(input: ICreateUser): Promise<string> {
    return await this.createUserProvider.execute(input);
  }
  async find(input: IFindUser): Promise<string> {
    return await this.findUserProvider.execute(input);
  }
}
