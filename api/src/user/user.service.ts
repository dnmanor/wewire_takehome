import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../convert/entities/transaction.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getTransactions(userId: string) {
    return this.transactionRepository.find({ where: { userId } });
  }
}
