import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password (never store plain text!)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    //                                                              ↑
    //                                                         salt rounds
    //                                              more = more secure but slower

    // Save user to database
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        role: registerDto.role,
      },
    });

    // Return tokens
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto) {
    // Validate email and password
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return JWT token
    return this.generateTokens(user);
  }

  async validateUser(email: string, password: string) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    // Compare plain password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Remove password from returned object (never expose it!)
    const { password: _, ...result } = user;
    return result;
  }

  private generateTokens(user: any) {
    const payload = {
      sub: user.id, // sub = subject (standard JWT claim)
      email: user.email,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }
}