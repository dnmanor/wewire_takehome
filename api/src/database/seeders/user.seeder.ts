import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async seed() {
    const email = this.configService.get<string>('INITIAL_USER_EMAIL');
    const password = this.configService.get<string>('INITIAL_USER_PASSWORD');

    if (!email || !password) {
      console.log('Missing initial user credentials in environment variables');
      return;
    }

    const userInitiated = await this.userRepository.findOne({
      where: { email },
    });

    if (!userInitiated) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user without using entity instance to avoid double hashing
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email,
          password: hashedPassword,
        })
        .execute();

      console.log('Initial user created successfully');
    } else {
      console.log('Initial user already exists');
    }
  }
}
