import z from 'zod';

const processNumericEnv = () =>
  z
    .string()
    .refine(value => !isNaN(parseInt(value, 10)), { message: 'Value must be a valid number' })
    .transform(value => parseInt(value, 10));

const WhatsAppEnvs = z.object({
  WA_API_TOKEN: z.string(),
  WA_API_VERSION: z.string(),
  WA_BUSINESS_PHONE: processNumericEnv(),
  WA_WEBHOOK_VERIFY_TOKEN: z.string(),
  LETTER_API_URL: z.string(),
});

type WhatsAppEnvsType = z.infer<typeof WhatsAppEnvs>;

export const WHATSAPP_API_ENVS: WhatsAppEnvsType = WhatsAppEnvs.parse(process.env);
