import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { LoginValidator } from './auth.validators';
import type { LoginDto, LoginResponse } from './auth.types';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: { name: string };
  createdAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: unknown): Promise<LoginResponse> {
    const parsed = LoginValidator.safeParse(payload);

    if (!parsed.success) {
      throw new BadRequestException(parsed.error);
    }

    const { email, password }: LoginDto = parsed.data;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (user as any).password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payloadToken: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: (user.role as any).name,
    };

    const access_token = this.jwtService.sign(payloadToken);

    return { access_token };
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user as UserProfile;
  }
}
