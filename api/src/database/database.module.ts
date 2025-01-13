import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserSeeder } from './seeders/user.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeeder],
  exports: [UserSeeder],
})
export class DatabaseModule {} 