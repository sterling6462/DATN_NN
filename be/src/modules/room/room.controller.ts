import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes } from '@nestjs/common';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { Public } from '../../core/decorator';
import { RoomService } from './room.service';
import { RoomRequestDto, RoomSearchDto } from './dto';
import { ObjectId } from 'mongodb';

@UsePipes(new MainValidationPipe())
@Controller('room')
export class RoomController {
  constructor(private readonly _service: RoomService) {}
  // @HttpCode(HttpStatus.OK)
  //
  @Get('')
  getAllRoom(@Query() query: RoomSearchDto) {
    return this._service.getAllRoom(query);
  }

  @Get('/dropdown')
  roomDropdownForBill(@Req() req: Request) {
    console.log(req["user"]);
    
    return this._service.roomDropdownForBill(req["user"]["houseId"]);
  }

  @Get(':id')
  findRoomById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findRoomById(id);
  }

  @Post('/create')
  createRoom(@Body() body: RoomRequestDto) {
    return this._service.createRoom(body);
  }

  @Delete(':id')
  deleteRoomById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.deleteRoomById(id);
  }

  @Patch(':id')
  @UsePipes(new MainValidationPipe())
  editRoom(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: any) {
    return this._service.editRoom(id, body);
  }
}
