import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../convert/entities/transaction.entity';
import { ConvertModule } from '../convert/convert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ConvertModule,
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
