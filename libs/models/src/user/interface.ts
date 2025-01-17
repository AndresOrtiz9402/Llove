import { Shared } from '..';
import { UserEntity } from './user.entity';

type OmitBaseEntity = Shared.OmitBaseEntity;

export type ICreateUser = Omit<UserEntity, OmitBaseEntity>;
export type IFindUser = Pick<UserEntity, 'id'>;

export interface ICreateUserUseCase {
  create(input: ICreateUser): Promise<string>;
}

export interface IFindUserUseCase {
  find(input: IFindUser): Promise<string>;
}
