import { Injectable } from '@nestjs/common';

import { Letter } from '@llove/product-domain/backend';

@Injectable()
export class AppService extends Letter.Application.LetterService {}
