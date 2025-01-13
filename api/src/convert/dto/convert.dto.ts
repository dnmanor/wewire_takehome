import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ConvertCurrencyDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}