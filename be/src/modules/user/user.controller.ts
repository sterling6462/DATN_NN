import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UsePipes
} from '@nestjs/common';
import { UserService } from './user.service';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { ObjectId } from 'mongodb';
import { UserCreateDto, UserSearchDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly _service: UserService) {}
  // @HttpCode(HttpStatus.OK)
  @Get('')
  getAllUser(@Query() query: UserSearchDto) {
    return this._service.getAllUser(query);
  }

  @Get(':id')
  findUserById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findUserById(id);
  }

  @Post('/create')
  createManager(@Body() body: UserCreateDto, @Req() req: Request) {
    if (req['user']['role'] != 'admin')
      throw new UnauthorizedException([{ field: 'Role', message: 'Unauthorized' }]);
    return this._service.createManager(body);
  }

  @Delete('/:id')
  deleteUserById(@Param('id', ParseObjectIdPipe) id: ObjectId, @Req() req: Request) {
    if (req['user']['username'] != 'admin')
      throw new UnauthorizedException([{ field: 'Role', message: 'Unauthorized' }]);
    return this._service.deleteUserById(id);
  }

  @Patch(':id')
  @UsePipes(new MainValidationPipe())
  editUser(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: any) {
    return this._service.editUser(id, body);
  }
}
