export type CreateErrors = { code: '23505' };
export type FindErrors = '404';

export const mappedErrors = {
  '23505': 409,
  '404': 404,
  '500': 500,
};
