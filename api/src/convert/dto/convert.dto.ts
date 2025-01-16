import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ConvertCurrencyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty()    
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;
}