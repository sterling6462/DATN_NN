import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Role } from '../../constants';
import { Roles } from '../../core/decorator';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { HouseCreateDto, HouseSearchDto, HouseUpdateDto } from './dto';
import { HouseService } from './house.service';

@UsePipes(new MainValidationPipe())
@Controller('house')
export class HouseController {
  constructor(private readonly _service: HouseService) {}
  // @HttpCode(HttpStatus.OK)
  @Get('')
  getAllHouse(@Query() query: HouseSearchDto) {
    return this._service.getAllHouse(query);
  }

  @Get('/dropdown')
  houseDropdown() {
    return this._service.houseDropdown();
  }

  @Get('/:id')
  findHouseById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findHouseById(id);
  }

  @Roles(Role.ADMIN)
  @Post('/create')
  createHouse(@Body() body: HouseCreateDto) {
    return this._service.createHouse(body);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateHouse(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: HouseUpdateDto) {
    return this._service.editHouseById(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  deleteHouseById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.deleteHouseById(id);
  }
}
