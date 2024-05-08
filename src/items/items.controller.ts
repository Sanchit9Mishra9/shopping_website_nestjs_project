import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { createItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';

@UseGuards(AuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  createItem(@Body() itemdetails: createItemDto) {
    return this.itemsService.createItem(itemdetails);
  }

  @Get('/all')
  getAllItems() {
    return this.itemsService.findAllItem();
  }

  @Get('/name/:name')
  findItemByName(@Param('name') name: string) {
    return this.itemsService.findItemByName(name);
  }

  @Get('/category/:category')
  findItemByCategory(@Param('category') category: string) {
    return this.itemsService.findItemByCategory(category);
  }

  @Get('/brand/:brand')
  findItemByBrand(@Param('brand') brand: string) {
    return this.itemsService.findItemByBrand(brand);
  }

  @Get('/:category/:brand')
  async vmo2(
    @Param('brand') brand: string,
    @Param('category') category: string,
  ) {
    const categories = this.itemsService.vmo2(category, brand);

    return categories;
  }
}
