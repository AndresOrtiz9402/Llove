import { ICreateUserUseCase, IFindUserUseCase } from './interface';

export type IUserRepository = ICreateUserUseCase & IFindUserUseCase;
