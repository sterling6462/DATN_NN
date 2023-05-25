import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { Public } from '../../core/decorator';
import { MainValidationPipe } from '../../pipes';
import { HouseService } from './house.service';
import { ObjectId } from 'mongoose';

@Public()
@UsePipes(new MainValidationPipe())
@Controller('house')
export class HouseController {
  constructor(private readonly _service: HouseService) {}
  // @HttpCode(HttpStatus.OK)
  //
  @Get('')
  getAllHouse(@Query() query: any) {
    return this._service.getAllHouse(query);
  }

  @Get('/:id')
  findHouseById(@Param() id: ObjectId) {
    return this._service.findHouseById(id);
  }

  @Post('/create')
  createHouse(@Body() body: any) {
    return this._service.createHouse(body);
  }

  @Delete('/:id')
  deleteHouseById(@Param() id: ObjectId) {
    return this._service.deleteHouseById(id);
  }
}

