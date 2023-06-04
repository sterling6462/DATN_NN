import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';
import { ObjectId } from 'mongodb';
import { UserCreateDto, UserSearchDto } from './dto';
import { getPagination, sortData } from '../../pagination';
import { searchKeyword } from '../../search';
import { hashValue } from '../../utils';

@Injectable()
export class UserService extends BaseLogger {
  private readonly houseCollection: Collection;
  private readonly billCollection: Collection;
  private readonly roomCollection: Collection;
  private readonly userCollection: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    super(UserService.name);
    this.userCollection = this.connection.collection('users');
    this.houseCollection = this.connection.collection('house');
    this.billCollection = this.connection.collection('bill');
    this.roomCollection = this.connection.collection('rooms');
  }
  async getAllUser(query: UserSearchDto): Promise<any> {
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    let where: any;

    if (keyword) where.name = searchKeyword(keyword);
    const [data, total] = await Promise.all([
      this.userCollection.find().sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).toArray(),
      this.userCollection.count()
    ]);

    return { data, total };
  }

  async findUserById(id: ObjectId): Promise<any> {
    const user = await this.userCollection.findOne({ _id: id });
    if (!user) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    return user;
  }

  async createManager(data: UserCreateDto): Promise<any> {
    const { name, phone, houseId } = data;
    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    const countManager = await this.userCollection.findOne({ houseId: new ObjectId(houseId) });
    if(!countManager ) throw new BadRequestException([{ field: 'houseId', message: 'Manager is exist in house' }]);

    if (!house) throw new BadRequestException([{ field: 'houseId', message: 'House is invalid' }]);
    const username = `${name}.manager@${house.name.toLowerCase().replace(/\s/g, '')}.nn.com`;
    const randomPass = Math.random().toString(36).slice(-8);
    const password = hashValue(randomPass, 10);
    const user = { name, username, password, role: 'manager', location: house.location, phone, houseId };

    const userId = (await this.userCollection.insertOne(user)).insertedId;
    return { userId, username, password: randomPass };
  }

  async deleteUserById(id: ObjectId): Promise<any> {
    const User = await this.userCollection.findOne({ _id: id });
    if (!User) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    return (await this.userCollection.deleteOne({ _id: id })).acknowledged;
  }

  async editUser(id: ObjectId, body: any): Promise<any> {
    const User = await this.userCollection.findOne({ _id: id });
    if (!User) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    const result = await this.userCollection.updateOne({ _id: id }, { $set: body }, { upsert: true });
    return result.modifiedCount;
  }
}
