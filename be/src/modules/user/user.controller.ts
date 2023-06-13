import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Query,
  Req,
  UnauthorizedException, UsePipes
} from '@nestjs/common';
import { UserService } from './user.service';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { ObjectId } from 'mongodb';
import { ManagerCreateDto, MemberCreateDto, UserEditDto, UserEditPasswordDto, UserSearchDto } from './dto';
import { Roles } from '../../core/decorator';
import { Role } from '../../constants';

@UsePipes(new MainValidationPipe())
@Controller('user')
export class UserController {
  constructor(private readonly _service: UserService) { }
  // @HttpCode(HttpStatus.OK)

  @Get('')
  getAllUser(@Query() query: UserSearchDto) {
    return this._service.getAllUser(query);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findUserById(@Param('id', ParseObjectIdPipe) id: ObjectId, @Req() req: Request) {
    if (req['user']['role'] != 'admin') throw new UnauthorizedException([{ field: 'Role', message: 'Unauthorized' }]);
    return this._service.findUserById(id);
  }

  @Roles(Role.ADMIN)
  @Post('/create/manager')
  createManager(@Body() body: ManagerCreateDto) {
    return this._service.createManager(body);
  }

  @Roles(Role.MANAGER)
  @Post('/create/member')
  createMember(@Body() body: MemberCreateDto, @Req() req: Request) {
    return this._service.createMember(body, req['user']);
  }

  @Roles(Role.MANAGER)
  @Delete('/:id')
  deleteUserById(@Param('id', ParseObjectIdPipe) id: ObjectId, @Req() req: Request) {
    return this._service.deleteUserById(id, req['user']);
  }

  @Roles(Role.MEMBER)
  @Patch('/edit/profile')
  @UsePipes(new MainValidationPipe())
  editProfile(@Body() body: UserEditDto, @Req() req: Request) {
    return this._service.editUser(req['user']['id'], body);
  }

  @Roles(Role.MEMBER)
  @Patch('/edit/password')
  @UsePipes(new MainValidationPipe())
  editPassword(@Body() body: UserEditPasswordDto, @Req() req: Request) {
    return this._service.editPassword(req['user']['id'], body);
  }
}
