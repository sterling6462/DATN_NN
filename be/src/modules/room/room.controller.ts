import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes } from '@nestjs/common';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { RoomService } from './room.service';
import { RoomEditDto, RoomCreateDto, RoomSearchDto } from './dto';
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

  @Get('/dropdown')
  roomDropdownForBill(@Req() req: Request) {
    return this._service.roomDropdownForBill(req["user"]["houseId"]);
  }
  
  @Get(':id')
  findRoomById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findRoomById(id);
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
