import { z } from 'zod';

const bffEnv = z.object({
  LETTER_API_URL: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  JWT_SECRET_KEY: z.string(),
  USER_API_URL: z.string(),
});

export const BFF_ENV = { ...bffEnv.parse(process.env) };

export class BffEnv {
  readonly LETTER_API_URL: string;
  readonly USER_API_URL: string;

  constructor() {
    this.LETTER_API_URL = BFF_ENV.LETTER_API_URL;
    this.USER_API_URL = BFF_ENV.USER_API_URL;
  }
}
