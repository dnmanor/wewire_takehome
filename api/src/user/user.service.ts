import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../convert/entities/transaction.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private logger: LoggerService,
  ) {}

  async getTransactions(userId: string) {
    this.logger.log(`Fetching transactions for user: ${userId}`);
    const transactions = await this.transactionRepository.find({ where: { userId } });
    this.logger.log(`Fetched ${transactions.length} transactions for user: ${userId}`);
    return transactions;
  }
}
