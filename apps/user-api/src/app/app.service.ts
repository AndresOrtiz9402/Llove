import {
  ExampleRepository,
  UserFindByIdUseCase,
  UserService,
} from '@llove/product-domain/backend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService extends UserService {
  constructor() {
    super(new UserFindByIdUseCase(new ExampleRepository()));
  }
}
