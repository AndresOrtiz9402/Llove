import { resolve } from 'path';

export const migrationsPath = (projectName: string) => {
  const basePathByEnv = {
    development: '../../../dist',
    production: '../../..',
  };
  const path = resolve(
    __dirname,
    `${
      basePathByEnv[process.env.NODE_ENV]
    }/libs/product-domain/backend/src/${projectName}/infrastructure/typeorm/migrations/*.js`
  );
  return [path];
};
