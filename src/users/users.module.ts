import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { ShoppingModule } from 'src/shopping/shopping.module';
import { ShopingCards } from 'src/entities/shoping.entity';

@Module({
  imports: [ShoppingModule, TypeOrmModule.forFeature([User, ShopingCards])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ShoppingModule,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
