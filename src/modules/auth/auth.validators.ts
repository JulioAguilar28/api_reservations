import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginPayload = z.infer<typeof LoginValidator>;
