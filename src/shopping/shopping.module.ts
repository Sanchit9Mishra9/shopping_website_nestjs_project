import { Module } from '@nestjs/common';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopingCards } from 'src/entities/shoping.entity';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.enitity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopingCards, Item, User])],
  controllers: [ShoppingController],
  providers: [ShoppingService],
  exports: [ShoppingService],
})
export class ShoppingModule {}
