import { BadRequestException, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { compareHash, hashValue } from '../utils';
import { BaseLogger } from '../core/logger';
import { Request } from 'express';
import { ClientRequestDto } from './dto';
import { ConfigService } from '../config';
import { log } from 'console';
import { IS_PUBLIC_KEY } from '../core/decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService extends BaseLogger {
  private readonly userCollection: Collection;
  constructor(private reflector: Reflector, private jwtService: JwtService, @InjectConnection() private connection: Connection) {
    super(AuthService.name);
    this.userCollection = this.connection.collection('users');
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userCollection.findOne({ username: username });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!compareHash(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      roles: user.roles,
      role: user.role,
      houseId: user?.houseId,
      roomId: user?.roomId,
      sub: user.userId
    };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async register(data: ClientRequestDto): Promise<any> {
    const user = await this.userCollection.findOne({ username: data.username });
    if (user) throw new BadRequestException({ message: 'Username is invalid' });
    const newClient = await this.userCollection.insertOne({
      ...data,
      password: hashValue(data.password, 10)
    });
    return newClient;
  }


  async validateToken(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: ConfigService.getInstance().get('JWT_SECRET')
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userCollection.findOne({ username: payload?.username })

      if (!user) {
        throw new UnauthorizedException();
      }
      return { status: true, data: user, error: null };
    } catch (e) {
      return { status: false, data: null, error: e.message };
    }
  }
}
