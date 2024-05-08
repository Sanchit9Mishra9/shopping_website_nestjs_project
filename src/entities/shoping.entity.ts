import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopingCards {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  itemname: string;

  @Column()
  shoponwhichDate: Date;

  @Column()
  price: number;
}
