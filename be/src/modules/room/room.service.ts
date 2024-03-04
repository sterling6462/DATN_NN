import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { RoomCreateDto, RoomDropdownDto, RoomEditDto, RoomSearchDto } from './dto';
import { BaseLogger } from '../../core/logger';
import { ObjectId } from 'mongodb';
import { getPagination, sortData } from '../../pagination';
import { searchKeyword } from '../../search';

@Injectable()
export class RoomService extends BaseLogger {
  private readonly houseCollection: Collection;
  private readonly roomCollection: Collection;
  constructor(@InjectConnection() private connection: Connection) {
    super(RoomService.name);
    this.roomCollection = this.connection.collection('rooms');
    this.houseCollection = this.connection.collection('house');
  }

  async getAllRoom(query: RoomSearchDto): Promise<any> {
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', type, houseId, keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    const where: any = {};

    if (type) where.type = type;
    if (keyword) where.name = searchKeyword(keyword);
    if (houseId) where.houseId = new ObjectId(houseId);

    const [data, total] = await Promise.all([
      this.roomCollection.find(where).sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).toArray(),
      this.roomCollection.count(where)
    ]);

    return { data, total };
  }

  async findRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'Id', message: 'Room is invalid' }]);
    return room;
  }

  calculatePrice(type: string, priceDefault: number) {
    let price: number, maxMember: number

    switch (type) {
      case 'normal':
        price = priceDefault;
        maxMember = 2;
        break;
      case 'VIP':
        maxMember = 2;
        price = priceDefault * 1.5;
        break;
      case 'apartment':
        maxMember = 4;
        price = priceDefault * 2;
        break;
      case 'VIP apartment':
        price = priceDefault * 2.5;
        maxMember = 4;
        break;
      default:
        break
    }
    return { price, maxMember }
  }

  async getRoomType(houseId: ObjectId): Promise<any> {

    const where: any = { member: { $ne: 0 } }
    if (houseId) where.houseId = new ObjectId(houseId);
    const room = await this.roomCollection.aggregate(
      [
        { $match: where },
        {
          $group:
          {
            _id:
            {
              type: "$type"
            },
            count: { $sum: 1 },
            type: { $first: "$type" },
            price: { $first: "$price" }
          },
        },
        {
          $project:
          {
            type: 1,
            price: 1,
            count: 1,
            _id: 0
          }
        },
        { $sort: { price: 1 } }
      ]).toArray()
    return room;
  }

  async createRoom(request: RoomCreateDto): Promise<any> {
    const { houseId, amountRoom, type, floor } = request;
    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    if (!house) throw new BadRequestException([{ field: 'clientId', message: 'House is invalid' }]);
    if (floor > house.floorCount) throw new BadRequestException([{ field: 'floor', message: 'Floor is invalid' }]);
    const { price, maxMember } = this.calculatePrice(type, house.priceDefault)

    const totalRoomByFloor = await this.roomCollection.count({
      $and: [{ houseId: { $eq: new ObjectId(houseId) } }, { floor: { $eq: floor } }]
    })
    const rooms = [];
    for (let i = 1; i <= amountRoom; i++) {
      const name = `${String(house.name)
        .split(' ')
        .map((a) => a[0])
        .join('')}.${floor}${String(totalRoomByFloor + i).padStart(2, '0')}`;
      const room = {
        name,
        type,
        price,
        maxMember,
        member: 0,
        status: false,
        due: false,
        dueDate: 8,
        floor,
        houseId: new ObjectId(houseId),
        lastElectricity: 0,
        joinDate: null
      };
      rooms.push(room);
    }

    return { total: (await this.roomCollection.insertMany(rooms)).insertedCount };
  }

  async deleteRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'roomId', message: 'Room is invalid' }]);
    if (!room.member) throw new BadRequestException([{ field: 'roomId', message: 'Room have member' }]);

    return (await this.roomCollection.deleteOne({ _id: id })).acknowledged;
  }

  async editRoom(id: ObjectId, body: RoomEditDto): Promise<any> {
    const { type } = body;
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'Id', message: 'Room is invalid' }]);
    const house = await this.houseCollection.findOne({ _id: new ObjectId(room.houseId) });
    const { price, maxMember } = this.calculatePrice(type, house.priceDefault)
    const result = await this.roomCollection.updateOne(
      { _id: id },
      { $set: { type, price, maxMember } },
      { upsert: true }
    );
    return { modifiedCount: result.modifiedCount };
  }

  async roomDropdownForBill(houseId: any): Promise<any> {
    return await this.roomCollection
      .find(
        { $and: [{ member: { $ne: 0 }, houseId: { $eq: new ObjectId(houseId) } }] },
        { projection: { _id: 1, name: 1 } }
      )
      .toArray();
  }

  async roomDropdown(query: RoomDropdownDto): Promise<any> {
    const { houseId } = query
    return await this.roomCollection
      .find(
        { houseId: houseId ? { $eq: new ObjectId(houseId) } : { $ne: null } },
        { projection: { _id: 1, name: 1 } }
      )
      .toArray();
  }
}
