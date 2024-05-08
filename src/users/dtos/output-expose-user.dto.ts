import { Expose } from 'class-transformer';

export class UserExposeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  gender: string;

  @Expose()
  price: string;

  @Expose()
  shoponwhichDate: Date;

  @Expose()
  itemname: string;
}
