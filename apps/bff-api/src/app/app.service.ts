import { Injectable } from '@nestjs/common';

import { Bff } from '@llove/product-domain/backend';
@Injectable()
export class AppService extends Bff.Application.BffService {}
