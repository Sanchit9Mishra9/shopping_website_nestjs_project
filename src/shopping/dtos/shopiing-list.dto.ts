import { IsNumber, IsString } from 'class-validator';

export class ItemShoppingDto {
  @IsString()
  itemname: string;

  @IsNumber()
  price: number;
}
