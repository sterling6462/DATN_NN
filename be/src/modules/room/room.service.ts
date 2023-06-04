import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { RoomRequestDto, RoomSearchDto } from './dto';
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
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    let where: any;

    if (keyword) where.name = searchKeyword(keyword);

    const [data, total] = await Promise.all([
      this.roomCollection.find(where).sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).toArray(),
      this.roomCollection.count()
    ]);

    return { data, total };
  }

  async findRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'Id', message: 'Room is invalid' }]);
    return room;
  }

  async createRoom(request: RoomRequestDto): Promise<any> {
    const { houseId, amountRoom, type, floor } = request;
    const houseItem = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    if (!houseItem) throw new BadRequestException(this.houseCollection.findOne({ _id: new ObjectId(houseId) }));
    let price: number, maxMember: number;
    switch (type) {
      case 'normal':
        price = 2500000;
        maxMember = 2;
        break;
      case 'VIP':
        maxMember = 2;
        price = 3000000;
        break;
      case 'apartment':
        maxMember = 4;
        price = 3500000;
        break;
      case 'VIP apartment':
        price = 4000000;
        maxMember = 4;
        break;
      default:
        break;
    }

    const [totalRoombyFloor, house] = await Promise.all([
      this.roomCollection.count({
        $and: [{ houseId: { $eq: new ObjectId(houseId) } }, { floor: { $eq: floor } }]
      }),
      this.houseCollection.findOne({ _id: new ObjectId(houseId) })
    ]);
    const rooms = [];
    for (let i = 1; i <= amountRoom; i++) {
      const name = `${String(house.name)
        .split(' ')
        .map((a) => a[0])
        .join('')}.${floor}${String(totalRoombyFloor + i).padStart(2, '0')}`;
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
        joinDate: null
      };
      rooms.push(room);
    }

    return { id: (await this.roomCollection.insertMany(rooms)).insertedCount };
  }

  async deleteRoomById(id: ObjectId): Promise<any> {
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'clientId', message: 'Room is invalid' }]);
    return (await this.roomCollection.deleteOne({ _id: id })).acknowledged;
  }

  async editRoom(id: ObjectId, body: any): Promise<any> {
    const { member } = body;
    const room = await this.roomCollection.findOne({ _id: id });
    if (!room) throw new BadRequestException([{ field: 'Id', message: 'Room is invalid' }]);
    if (member > room.maxMember) throw new BadRequestException([{ field: 'Member', message: 'Member is invalid' }]);
    const result = await this.roomCollection.updateOne(
      { _id: id },
      { $set: { member, status: Boolean(member), joinDate: Boolean(member) ? new Date() : null } },
      { upsert: true }
    );
    return result.modifiedCount;
  }

  async roomDropdownForBill(houseId: any): Promise<any> {
    return await this.roomCollection
      .find(
        { $and: [{ member: { $ne: 0 }, houseId: { $eq: new ObjectId(houseId) } }] },
        { projection: { _id: 1, name: 1 } }
      )
      .toArray();
  }
}
