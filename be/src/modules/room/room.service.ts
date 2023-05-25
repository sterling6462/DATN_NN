import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection, ObjectId } from 'mongoose';
import { RoomRequestDto, RoomSearchDto } from './dto';
import { log } from 'console';
import { BaseLogger } from '../../core/logger';

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

  async createRoom(request: RoomRequestDto): Promise<any> {
    const { houseId,amountRoom, type, floor } = request
    let price: number, maxMember: number
    switch (type) {
      case "normal":
        price = 2500000
        maxMember = 2
        break;
      case "VIP":
        maxMember = 2
        price = 300000
        break;
      case "apartment":
        maxMember = 4
        price = 350000
        break;
      case "VIP apartment":
        price = 400000
        maxMember = 4
        break;
      default:
        break;
    }
    const [totalRoombyFloor, house] = await Promise.all([this.roomCollection.count({ floor }), this.houseCollection.findOne()])
    let rooms=[]
    for(let i=1;i<=amountRoom;i++){
      const name=`${String(house.location).split(" ").map(a => a[0]).join("")}.${floor}${String(totalRoombyFloor+i).padStart(2, '0')}`
      const room = { name, type, price, maxMember, member: 0, status: false, due: false, dueDate: 8, floor, houseId, joinDate: new Date(), }
      rooms.push(room)
    }

    return { id: (await this.roomCollection.insertMany(rooms)).insertedCount }
  }

  async deleteRoomById(id: ObjectId): Promise<any> {
    return (await this.roomCollection.deleteOne({ _id: id })).acknowledged;
  }
}
