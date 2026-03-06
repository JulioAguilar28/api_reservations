import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './users.types';

export class UserFactory {
  private static readonly SALT_ROUNDS = 10;

  static async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    return {
      roleId: data.roleId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    };
  }
}
