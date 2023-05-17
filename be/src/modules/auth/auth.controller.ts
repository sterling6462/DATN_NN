import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../../core/decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private  readonly _service: AuthService){
    }
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this._service.signIn(signInDto.username, signInDto.password);
    }
    
    @Get('a')
    ab(){
        return "ok" 
    }
}
