import { IsNumber, IsString } from 'class-validator';

export class CreateShoppingDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  itemname: string;

  @IsString()
  shoponwhichDate: string;

  @IsNumber()
  price: number;
}
