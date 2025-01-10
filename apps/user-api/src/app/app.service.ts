import { Injectable } from '@nestjs/common';

import { User } from '@llove/product-domain/backend';

@Injectable()
export class AppService extends User.Application.UserService {}
