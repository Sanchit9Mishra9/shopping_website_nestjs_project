import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { createItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) {}

  async createItem(itemDetails: createItemDto) {
    const name = itemDetails.name;
    const items = await this.repo.findOneBy({ name });
    if (items) {
      return 'already in database with same name';
    }
    const item = this.repo.create(itemDetails);
    return await this.repo.save(item);
  }

  async findAllItem() {
    return await this.repo.find();
  }

  async findItemByName(name: string) {
    if (!name) {
      return 'write name';
    }
    const item = await this.repo.findOneBy({ name });
    if (!item) {
      return 'wrong name';
    }
    return item;
  }

  async findItemByCategory(category: string) {
    const item = await this.repo.find({ where: { category } });
    if (!item.length) {
      return 'wrong category';
    }
    return item;
  }

  async findItemByBrand(brand: string) {
    const item = await this.repo.find({ where: { brand } });
    if (!item.length) {
      return 'wrong brand';
    }
    return item;
  }

  async vmo2(category: string, brand: string) {
    const item = await this.repo.find({ where: { category, brand } });
    if (!item.length) {
      return 'wrong category or brand name';
    }
    return item;
  }
}
