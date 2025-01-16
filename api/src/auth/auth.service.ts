import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoggerService } from '../logger/logger.service';

export interface TokenPayload {
  sub: string;
  email: string;
  nonce: string;
  timestamp: number;
  sequence: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  private readonly TOKEN_EXPIRY = 24 * 60 * 60;
  private readonly userSequences = new Map<string, number>();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async login(loginDto: LoginDto, response: Response): Promise<LoginResponse> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      this.logger.log('Invalid credentials for email: ' + loginDto.email, {
        message: 'User not found',
        email: loginDto.email,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await user.validatePassword(loginDto.password);

    if (!validPassword) {
      this.logger.log('Invalid credentials for email: ' + loginDto.email, {
        message: 'Invalid credentials',
        email: loginDto.email,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // Initialize or increment sequence number for this user
    const sequence = (this.userSequences.get(user.id) || 0) + 1;
    this.userSequences.set(user.id, sequence);

    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      nonce: uuidv4(),
      timestamp: Math.floor(Date.now() / 1000),
      sequence,
    };

    const token = await this.jwtService.signAsync(payload);
    response.cookie('kanijiru', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { success: true, message: 'Authentication successful' };
  }

  async validateToken(payload: TokenPayload): Promise<boolean> {
    const currentTime = Math.floor(Date.now() / 1000);

    // Check expiration
    if (currentTime - payload.timestamp > this.TOKEN_EXPIRY) {
      throw new UnauthorizedException('Token expired');
    }

    const latestSequence = this.userSequences.get(payload.sub) || 0;

    if (payload.sequence < latestSequence) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
