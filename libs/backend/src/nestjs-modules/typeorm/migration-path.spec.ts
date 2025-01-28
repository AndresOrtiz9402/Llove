import { resolve } from 'path';

import { Testing } from '../../../../../tools';
import { migrationsPath } from './migration-path';

const path = resolve(
  __dirname,
  `../../../../product-domain/backend/src/user/infrastructure/typeorm/migrations/*.{js,ts}`
);

const envConfigTest = new Testing.Shared.Test(migrationsPath, [
  {
    title: 'Migration path.',
    input: 'user',
    expected: [path],
  },
]);

Testing.Jest.runTest(envConfigTest);
