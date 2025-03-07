import { z } from 'zod';

const bffEnv = z.object({
  LETTER_API_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  SECRET_JWT_KEY: z.string(),
  USER_API_URL: z.string(),
});

export const BFF_ENV = { ...bffEnv.parse(process.env) };

export class BffEnv {
  readonly LETTER_API_URL: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly SECRET_JWT_KEY: string;
  readonly USER_API_URL: string;

  constructor() {
    this.LETTER_API_URL = BFF_ENV.LETTER_API_URL;
    this.GOOGLE_CLIENT_ID = BFF_ENV.GOOGLE_CLIENT_ID;
    this.GOOGLE_CLIENT_SECRET = BFF_ENV.GOOGLE_CLIENT_SECRET;
    this.SECRET_JWT_KEY = BFF_ENV.SECRET_JWT_KEY;
    this.USER_API_URL = BFF_ENV.USER_API_URL;
  }
}
