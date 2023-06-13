import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { compareHash, hashValue } from '../../utils';
import { BaseLogger } from '../../core/logger';
import { ClientRequestDto } from './dto';

@Injectable()
export class AuthService extends BaseLogger {
  private readonly userCollection: Collection;
  constructor(@InjectConnection() private connection: Connection, private jwtService: JwtService) {
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
}
