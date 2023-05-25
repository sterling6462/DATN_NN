import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection, ObjectId } from 'mongoose';
import { BaseLogger } from '../../core/logger';

@Injectable()
export class HouseService extends BaseLogger {
  private readonly houseCollection: Collection;
  private readonly roomCollection: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    super(HouseService.name);
    this.houseCollection = this.connection.collection('house');
    this.roomCollection = this.connection.collection('room');

  }
  async getAllHouse(query: any): Promise<any> {
    const { num, name, page = 1, size = 10, id } = query;
    const filter = {};

    const [data, total,roomCount] = await Promise.all([this.houseCollection
      .find()
      .sort({ id: 1 })
      .limit(size)
      .skip(page - 1).toArray(),
    this.houseCollection.count(),
    this.roomCollection.count({ houseId: id })])
      const house={...data,roomCount}
    return { house, total };
  }

  async findHouseById(id: ObjectId): Promise<any> {
    const house = await this.houseCollection.findOne({ _id: id });
    return house;
  }

  async createHouse(data: any): Promise<any> {
    const house = { ...data, joinDate: new Date() }
    return { id: (await this.houseCollection.insertOne(house)).insertedId }
  }

  async deleteHouseById(id: ObjectId): Promise<any> {
    return (await this.houseCollection.deleteOne({ _id: id })).acknowledged;
  }
}