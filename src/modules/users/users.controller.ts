import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':name')
  greet(@Param('name') name: string): string {
    return `Hello ${name}`;
  }

  @Post('')
  async create(@Body() body: CreateUserDto) {
    console.log('create users controller');
    return this.usersService.createUser(body);
  }
}
