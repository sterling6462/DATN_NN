import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection, ObjectId } from 'mongoose';
import { RoomRequestDto, RoomSearchDto } from './dto';
import { log } from 'console';
import { BaseLogger } from '../../core/logger';

@Injectable()
export class RoomService extends BaseLogger {
  private readonly roomCollection: Collection;
  constructor(@InjectConnection() private connection: Connection) {
    super(RoomService.name);
    this.roomCollection = this.connection.collection('rooms');
  }

  async getAllRoom(query: RoomSearchDto): Promise<any> {
    const { num, name, page = 1, size = 10 } = query;
    const filter = {};
    const [data, total] = await Promise.all([this.roomCollection
      .find()
      .sort({ id: 1 })
      .limit(size)
      .skip(page - 1).toArray(),
    this.roomCollection.count()])

    return { data, total };
  }

  async findRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    return room;
  }

  async createRoom(data: RoomRequestDto): Promise<any> {
    const Room = { ...data, joinDate: new Date() }
    return { id: (await this.roomCollection.insertOne(Room)).insertedId }
  }

  async deleteRoomById(id: ObjectId): Promise<any> {
    return (await this.roomCollection.deleteOne({ _id: id })).acknowledged;
  }
}
