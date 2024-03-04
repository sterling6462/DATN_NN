import {
  Body,
  Controller, ExecutionContext, HttpCode,
  HttpStatus,
  Post,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../pipes';
import { Public } from '../core/decorator';
import { AuthService } from './auth.service';
import { ClientRequestDto, LoginRequestDto } from './dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Public()
@Controller('auth')
@UsePipes(new MainValidationPipe())
export class AuthController {
  constructor(private readonly _service: AuthService) { }
  // @Public()
  // @MessagePattern('login')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginRequestDto) {
    return this._service.signIn(signInDto.username, signInDto.password);
  }

  // @Public()
  @Post('register')
  register(@Body() signInDto: ClientRequestDto) {
    return this._service.register(signInDto);
  }

  @MessagePattern('validate_token')
  public async getUserByAccessToken(@Payload() token: string) {
    return this._service.validateToken(token);
  }
}
