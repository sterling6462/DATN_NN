import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { query } from 'express';
import { PaginationDto } from 'src/dto';
import { MainValidationPipe } from '../../pipes';
import { Public } from '../../core/decorator';
import { RoomService } from './room.service';
import { RoomRequestDto, RoomSearchDto } from './dto';
import { ObjectId } from 'mongoose';

@Public()
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

  @Get('/:id')
  findRoomById(@Param() id: ObjectId) {
    return this._service.findRoomById(id);
  }

  @Post('/create')
  createRoom(@Body() body: RoomRequestDto) {
    return this._service.createRoom(body);
  }

  @Delete('/:id')
  deleteRoomById(@Param() id: ObjectId) {
    return this._service.deleteRoomById(id);
  }
}
