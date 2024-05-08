import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { userSigndto } from './dtos/user-sign.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/entities/user.enitity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serilize } from 'src/interceptors/serialize.interceptor';
import { UserExposeDto } from './dtos/output-expose-user.dto';
import { signInDto } from './dtos/signIn-User.dto';

@Controller('users')
@Serilize(UserExposeDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() userdetail: createUserDto) {
    return this.userService.createUser(userdetail);
  }

  @Post('/signin')
  async signinUser(@Body() userdetail: signInDto, @Session() session: any) {
    const user = await this.userService.signinUser(userdetail);
    if (!user) {
      return user;
    }
    session.userId = user;
    return user;
  }

  @Post('/signout')
  async signoutUser(@Session() session: any) {
    if (session.userId === undefined) {
      return 'you are already signout';
    }
    session.userId = undefined;
    return 'signout';
  }

  @Get('/itemlists')
  async itemsBoughtByUser(@CurrentUser() user: User) {
    return await this.userService.itemsBoughtByUser(user.name);
  }

  @UseGuards(AuthGuard)
  @Get('/whoissign')
  async whoisSign(@CurrentUser() user: User) {
    return user;
  }
}
