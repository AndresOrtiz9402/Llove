import { Injectable } from '@nestjs/common';

import { Bff } from '@llove/product-domain/backend';

import { Config } from '..';
@Injectable()
export class AppService extends Bff.Application.BffService {
  constructor() {
    super(Config.BFF_ENV);
  }
}
