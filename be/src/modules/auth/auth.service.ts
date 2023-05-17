import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';

@Injectable()
export class AuthService extends BaseLogger{

      // private readonly userCollection: Collection;
  constructor(@InjectConnection() private connection: Connection, private jwtService: JwtService) {
    super(AuthService.name);
    // this.userCollection = this.connection.collection('users');
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user ={userId:"1",username: "bao",password:"123"} 
    // await this.userCollection.findOne(a=>a.username===username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
