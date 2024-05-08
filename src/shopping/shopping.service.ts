import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { ShopingCards } from 'src/entities/shoping.entity';
import { User } from 'src/entities/user.enitity';
import { createItemDto } from 'src/items/dtos/create-item.dto';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { ItemShoppingDto } from './dtos/shopiing-list.dto';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(ShopingCards) private repo: Repository<ShopingCards>,
    @InjectRepository(Item) private repolist: Repository<Item>,
  ) {}

  async getAllShoping() {
    return await this.repo.find();
  }

  async createShoppingList(
    userDetail: createUserDto,
    itemDetail: ItemShoppingDto,
  ) {
    console.log(userDetail);

    console.log(itemDetail);
    const name = itemDetail.itemname;
    const item = await this.repolist.findOneBy({ name });
    if (!item) {
      return 'Cannot do shopping of unknown item that is not in our website';
    }
    const username = userDetail.name;
    const shoponwhichDate = new Date();
    const itemname = itemDetail.itemname;

    const price = itemDetail.price;
    const shopiings = { username, itemname, price, shoponwhichDate };
    const shoppinglist = this.repo.create(shopiings);
    return this.repo.save(shoppinglist);
  }
}
