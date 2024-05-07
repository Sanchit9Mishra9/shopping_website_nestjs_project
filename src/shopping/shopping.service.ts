import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { ShopingCards } from 'src/entities/shoping.entity';
import { User } from 'src/entities/user.enitity';
import { createItemDto } from 'src/items/dtos/create-item.dto';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(ShopingCards) private repo: Repository<ShopingCards>,
  ) {}

  async getAllShoping() {
    return await this.repo.find();
  }

  //   username: string;
  //   itemname: string;
  //   shoponwhichDate: string;
  //   price: number;

  async createShoppingList(
    userDetail: createUserDto,
    itemDetail: createItemDto,
  ) {
    console.log(userDetail);

    console.log(itemDetail);
  }
}
