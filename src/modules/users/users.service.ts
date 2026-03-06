import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserValidator } from './users.validators';
import { CreateUserDto } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(payload: unknown) {
    // Zod validation
    const parsed = UserValidator.validateCreate(payload);

    if (!parsed.success) {
      throw new BadRequestException(parsed.error);
    }

    const data: CreateUserDto = parsed.data;

    try {
      return await this.usersRepository.create(data);
    } catch (error: any) {
      /**
       * Prisma Errors:
       * P2002 -> Unique constraint
       * P2003 -> Foreign key constraint
       */

      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }

      if (error.code === 'P2003') {
        throw new BadRequestException('Role does not exist');
      }

      throw error;
    }
  }
}
