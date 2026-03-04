import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getGreeting(name: string): string {
    return `Hola, ${name}!`;
  }
}
