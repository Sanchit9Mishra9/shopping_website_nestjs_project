import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.enitity';
import { Repository } from 'typeorm';
import { createUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { signInDto } from './dtos/signIn-User.dto';
import { ShopingCards } from 'src/entities/shoping.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(ShopingCards)
    private repoShopping: Repository<ShopingCards>,
  ) {}

  async findUserByName(name: string) {
    const user = await this.repo.findOneBy({ name });
    return user;
  }

  async createUser(userdetail: createUserDto) {
    const check = await this.findUserByName(userdetail.name);
    if (check) {
      return 'username already in database';
    }
    const salt = randomBytes(8).toString('hex');
    //hash the salt and the password together
    const hash = (await scrypt(userdetail.password, salt, 32)) as Buffer;

    //join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    //Create a new user and save it
    const { password, ...rest } = userdetail;

    const newuserdetail = { password: result, ...rest };

    const user = this.repo.create(newuserdetail);

    return await this.repo.save(user);
  }

  async signinUser(userdetail: signInDto) {
    const check = await this.findUserByName(userdetail.name);
    if (!check) {
      return new BadRequestException('username not in database please signup');
    }
    const [salt, storedHash] = check.password.split('.');
    const hash = (await scrypt(userdetail.password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad Password');
    }
    return check;
  }

  async itemsBoughtByUser(username: string) {
    return await this.repoShopping.find({ where: { username } });
  }

  //   findOne(name: string) {
  //     //list
  //     return this.repo.findOneBy({ name });
  //   }

  //   find(name: string) {
  //     return this.repo.find({ where: { name } });
  //   }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findALL() {
    return await this.repo.find();
  }

  async find(city: string) {
    ///list or array
    return await this.repo.find({ where: { city } });
  }
}
