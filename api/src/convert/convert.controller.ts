import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertCurrencyDto } from './dto/convert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User as UserDecorator } from '../auth/decorators/user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';

@Controller('convert')
@UseGuards(JwtAuthGuard)
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Post()
  processCurrencyConversion(
    @Body() convertDto: ConvertCurrencyDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.convertService.convertCurrency(convertDto, user);
  }
}