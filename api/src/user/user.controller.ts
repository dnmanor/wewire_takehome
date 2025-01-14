import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User as UserEntity } from '../user/entities/user.entity';
import { User as UserDecorator } from '../auth/decorators/user.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('transactions')
  async getUserTransactions(@UserDecorator() user: UserEntity) {
    try {
      return await this.userService.getTransactions(user.id);
    } catch (error) {
      console.error(
        `Error fetching transactions${user.id ? ` for user ${user.id}` : ''}`,
        error,
      );
      throw new Error('Could not fetch transactions');
    }
  }
}
