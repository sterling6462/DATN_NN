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
    this.roomCollection = this.connection.collection('rooms');

  }
  async getAllHouse(query: any): Promise<any> {
    const { num, name, page = 1, size = 10, id } = query;
    const filter = {};

    const [data, total] = await Promise.all([this.houseCollection
      .aggregate([{
        $lookup:
        {
          from: "rooms",
          localField: "_id",
          foreignField: "houseId",
          as: "branch"
        }
      }, {
        $project: {
          name: 1,
          location: 1,
          managerId: 1,
          roomCount: { $size: "$branch" }
        }
      }, { $sort: { id: 1 } }, { $skip: page - 1 }, { $limit: size }]).toArray(),
    // .sort({ id: 1 })
    // .limit(size)
    // .skip(page - 1).toArray(),
    this.houseCollection.count()
    ])
    return { data, total };
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