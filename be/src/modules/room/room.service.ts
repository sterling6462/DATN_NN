import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection, ObjectId } from 'mongoose';
import { RoomRequestDto, RoomSearchDto } from './dto';

@Injectable()
export class RoomService {
  private readonly roomCollection: Collection;
  constructor(@InjectConnection() private connection: Connection) {
    this.roomCollection = this.connection.collection('rooms');
  }

  async getAllRoom(query: RoomSearchDto): Promise<any> {
    const { num, name, page = 1, size = 10 } = query;
    const filter = {};
    const data = this.roomCollection
      .find(filter)
      .sort({ id: 1 })
      .skip(page)
      .limit(size);
    return data;
  }

  async findRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    return room;
  }

  async createRoom(data: RoomRequestDto): Promise<any>{
    return (await this.roomCollection.insertOne(data)).insertedId
  }

  async deleteRoomById(id: ObjectId):Promise<any>{
    return (await this.roomCollection.deleteOne({ _id: id })).acknowledged;
  }
}
