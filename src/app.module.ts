import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.enitity';
import { ItemsModule } from './items/items.module';
import { Item } from './entities/item.entity';
import { ShoppingModule } from './shopping/shopping.module';
import { ShopingCards } from './entities/shoping.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sanchit',
      entities: [User, Item, ShopingCards],
      synchronize: true,
    }),
    ItemsModule,
    ShoppingModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
