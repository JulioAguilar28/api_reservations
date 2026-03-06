import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    roleId: number;
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return this.prisma.user.create({
      data,
      select: {
        roleId: true,
        fullName: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });
  }
}
