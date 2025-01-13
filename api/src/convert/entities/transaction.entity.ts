import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Generated } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum TransactionStatus {
  PENDING = 'pending',
  INITIATED = 'initiated',
  COMPLETED = 'completed'
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', unique: true })
  @Generated('increment')
  reference: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @Column()
  fromCurrency: string;

  @Column()
  toCurrency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  fromAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  toAmount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 