// Types for users
import { z } from 'zod';

export const CreateUserSchema = z.object({
  roleId: z.number().int().positive(),
  fullName: z.string().min(3).max(150),
  email: z.email(),
  phone: z.string().min(10).max(20),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
