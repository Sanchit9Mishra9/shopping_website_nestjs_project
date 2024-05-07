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

  @Post('/name')
  findItemByName(@Body() body) {
    return this.itemsService.findItemByName(body.name);
  }

  @Post('/category')
  findItemByCategory(@Body() body) {
    return this.itemsService.findItemByCategory(body.category);
  }

  @Post('/brand')
  findItemByBrand(@Body() body) {
    return this.itemsService.findItemByBrand(body.brand);
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
