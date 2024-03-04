import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes } from '@nestjs/common';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { RoomService } from './room.service';
import { Request } from 'express';
import { RoomEditDto, RoomCreateDto, RoomSearchDto, RoomDropdownDto } from './dto';
import { ObjectId } from 'mongodb';
import { Roles } from '../../core/decorator';
import { Role } from '../../constants';

@UsePipes(new MainValidationPipe())
@Controller('room')
export class RoomController {
  constructor(private readonly _service: RoomService) {}
  // @HttpCode(HttpStatus.OK)
  //
  @Roles(Role.MANAGER)
  @Get('')
  getAllRoom(@Query() query: RoomSearchDto) {
    return this._service.getAllRoom(query);
  }

  @Get('/dropdown/bill')
  roomDropdownForBill(@Req() req: Request) {
    return this._service.roomDropdownForBill(req["user"]["houseId"]);
  }

  @Get('/dropdown')
  roomDropdown(@Query() query:RoomDropdownDto ) {
    return this._service.roomDropdown(query);
  }
  
  @Get(':id')
  findRoomById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findRoomById(id);
  }

  @Get(':houseId/type')
  getRoomType(@Param('houseId', ParseObjectIdPipe) houseId: ObjectId) {
    return this._service.getRoomType(houseId);
  }

  @Roles(Role.ADMIN)
  @Post('/create')
  createRoom(@Body() body: RoomCreateDto) {
    return this._service.createRoom(body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteRoomById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.deleteRoomById(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  editRoom(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: RoomEditDto) {
    return this._service.editRoom(id, body);
  }
}
