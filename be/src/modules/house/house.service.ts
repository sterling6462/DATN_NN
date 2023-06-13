import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';
import { ObjectId } from 'mongodb';
import { HouseCreateDto, HouseUpdateDto } from './dto';
import { getPagination, sortData } from '../../pagination';
import { searchKeyword } from '../../search';

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
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    let where: any;

    if (keyword) where.name = searchKeyword(keyword);
    const [dataRaw, total] = await Promise.all([
      this.houseCollection.find(where).sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).toArray(),
      this.houseCollection.count()
    ]);
    const data = await Promise.all(
      dataRaw.map(async (a) => {
        const [roomAvailable, roomCount] = await Promise.all([
          this.roomCollection.count({
            $and: [{ houseId: { $eq: a._id } }, { member: { $eq: 0 } }]
          }),
          this.roomCollection.count({ houseId: a._id })
        ]);

        return {
          id: a._id,
          name: a.name,
          roomAvailable: roomAvailable,
          roomCount: roomCount,
          floorCount: a.floorCount,
          location: a.location,
          detail: a.detail,
          rate: a.rate,
          electricityPrice: a.electricityPrice,
          waterPrice: a.waterPrice,
          wifiPrice: a.wifiPrice
        };
      })
    );

    return { data, total };
  }

  async findHouseById(id: ObjectId): Promise<any> {
    const house = await this.houseCollection.findOne({ _id: id });
    if (!house) throw new BadRequestException([{ field: 'Id', message: 'House is invalid' }]);
    return house;
  }

  async createHouse(data: HouseCreateDto): Promise<any> {
    const house = { ...data, createDate: new Date() };
    return { count: (await this.houseCollection.insertOne(house)).insertedId };
  }

  async deleteHouseById(id: ObjectId): Promise<any> {
    const house = await this.houseCollection.findOne({ _id: id });
    if (!house) throw new BadRequestException([{ field: 'Id', message: 'House is invalid' }]);
    const status = (await this.houseCollection.deleteOne({ _id: id })).acknowledged;
    return { status };
  }

  async editHouseById(id: ObjectId, body: HouseUpdateDto): Promise<any> {
    const { detail, electricityPrice, waterPrice, wifiPrice } = body;
    const house = await this.houseCollection.findOne({ _id: id });
    if (!house) throw new BadRequestException([{ field: 'Id', message: 'House is invalid' }]);
    const result = await this.houseCollection.updateOne(
      { _id: id },
      { $set: { detail, wifiPrice, electricityPrice, waterPrice } },
      { upsert: true }
    );
    return { modifiedCount: result.modifiedCount };
  }

  async houseDropdown(): Promise<any> {
    return await this.houseCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();
  }
}
