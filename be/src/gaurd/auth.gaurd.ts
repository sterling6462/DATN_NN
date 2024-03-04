import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '../config';
import { IS_PUBLIC_KEY } from '../core/decorator';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) { }

  async canActivate(context: ExecutionContext) {
    const isRpc = context.getType() === 'rpc';
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic || isRpc) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let token = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }
    token = token.replace('Bearer ', '');
    const user = await firstValueFrom(
      this.authClient.send('validate_token', token),
    );
    
    if (!user.data) {
      throw new UnauthorizedException();
    }
    request.user = user;
    return true;
  }
}
