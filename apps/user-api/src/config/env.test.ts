import { resolve } from 'path';

import { Testing } from '../../../../tools';
import { migrationsPath } from '.';

const path = resolve(
  __dirname,
  `../../../../libs/product-domain/backend/src/user/infrastructure/typeorm/migrations/*.{js,ts}`
);

const Test = new Testing.Shared.Test(migrationsPath, [
  {
    title: 'User migrations path.',
    input: '',
    expected: [path],
  },
]);

Testing.Jest.runTest(Test);
