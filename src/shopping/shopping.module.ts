import { Module } from '@nestjs/common';
import { ShoppingController } from './shopping.controller';
import { ShoppingService } from './shopping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopingCards } from 'src/entities/shoping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopingCards])],
  controllers: [ShoppingController],
  providers: [ShoppingService],
})
export class ShoppingModule {}
