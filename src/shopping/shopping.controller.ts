import { Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.enitity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ShoppingService } from './shopping.service';

@Controller('shopping')
export class ShoppingController {
  constructor(private repoShop: ShoppingService) {}

  //   @Get()
  //   currentUser(@CurrentUser() user: User) {
  //     return user;
  //   }

  @Get()
  async allShopping() {
    return await this.repoShop.getAllShoping();
  }

  @Post()
  async createShopping(@CurrentUser() user: User) {
    // return await this
  }
}
