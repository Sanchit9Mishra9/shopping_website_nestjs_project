import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.enitity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ShoppingService } from './shopping.service';
import { createItemDto } from 'src/items/dtos/create-item.dto';
import { ItemShoppingDto } from './dtos/shopiing-list.dto';

@Controller('shopping')
export class ShoppingController {
  constructor(private repoShop: ShoppingService) {}

  @Get()
  async allShopping() {
    return await this.repoShop.getAllShoping();
  }

  @Post()
  async createShopping(
    @CurrentUser() user: User,
    @Body() lists: ItemShoppingDto,
  ) {
    // return await this
    const shoping = await this.repoShop.createShoppingList(user, lists);
    return shoping;
  }
}
