import { CreateUserSchema } from './users.types';

export class UserValidator {
  static validateCreate(data: unknown) {
    return CreateUserSchema.safeParse(data);
  }
}
