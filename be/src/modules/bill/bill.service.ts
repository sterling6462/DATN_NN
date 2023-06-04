import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';
import { ObjectId } from 'mongodb';
import { BillCreateDto, BillEditDto, BillSearchDto } from './dto';
import { getPagination, sortData } from '../../pagination';
import { searchKeyword } from '../../search';

@Injectable()
export class BillService extends BaseLogger {
  private readonly houseCollection: Collection;
  private readonly billCollection: Collection;
  private readonly roomCollection: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    super(BillService.name);
    this.houseCollection = this.connection.collection('house');
    this.billCollection = this.connection.collection('bills');
    this.roomCollection = this.connection.collection('rooms');
  }
  async getAllBill(query: BillSearchDto): Promise<any> {
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', roomId, houseId, keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    let where: any;

    if (keyword) where.name = searchKeyword(keyword);
    if (roomId) where.roomId = new ObjectId(roomId);
    if (houseId) where.houseId = new ObjectId(houseId);

    const [data, total] = await Promise.all([
      this.billCollection.find(where).sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).toArray(),
      this.billCollection.count()
    ]);
    const bill = await Promise.all(
      data.map(async (a) => {
        const room = await this.roomCollection.findOne({ _id: new ObjectId(a.roomId) });

        return {
          id: a._id,
          electricityBill: a.electricityBill,
          waterBill: a.waterBill,
          wifiBill: a.wifiBill,
          total: a.total,
          createBy: a.createBy,
          createdAt: a.createdAt,
          roomBill: a.roomBill,
          status: a.status,
          roomName: room.name
        };
      })
    );
    return { data: bill, total };
  }

  async findBillById(id: ObjectId): Promise<any> {
    const bill = await this.billCollection.findOne({ _id: id });
    if (!bill) throw new BadRequestException([{ field: 'Id', message: 'Bill is invalid' }]);
    return bill;
  }

  async createBill(data: BillCreateDto, user: any): Promise<any> {
    const { roomId, numberElectricity, other } = data;
    const room = await this.roomCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) throw new BadRequestException({ field: 'Id', message: 'Room is invalid' });
    const { member, price, houseId } = room;
    if (houseId !== user['houseId']) throw new BadRequestException([{ field: 'HouseId', message: 'Dont Permission' }]);
    if (!member) throw new BadRequestException([{ field: 'RoomId', message: 'This is empty room ' }]);
    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    const { electricityPrice, waterPrice, wifiPrice } = house;
    const electricityBill = electricityPrice * numberElectricity;
    const waterBill = waterPrice * member;
    const wifiBill = wifiPrice;
    const otherBill = other ? other : 0;
    const total = electricityBill + waterBill + wifiBill + price + otherBill;

    const bill = {
      houseId,
      roomId: new ObjectId(roomId),
      electricityBill,
      waterBill,
      wifiBill,
      roomBill: price,
      otherBill,
      total,
      createBy: user['username'],
      createdAt: new Date(),
      status: false
    };
    const [statusBill, updateBillRoom] = await Promise.all([
      (await this.billCollection.insertOne(bill)).insertedId,
      this.roomCollection.updateOne(
        { _id: new ObjectId(roomId) },
        { $set: { due: false, dueDate: new Date().getDate() } }
      )
    ]);

    return { billID: statusBill, roomUpdate: updateBillRoom.matchedCount };
  }

  async deleteBillById(id: ObjectId): Promise<any> {
    const bill = await this.billCollection.findOne({ _id: id });
    if (!bill) throw new BadRequestException([{ field: 'Id', message: 'Bill is invalid' }]);
    return (await this.billCollection.deleteOne({ _id: id })).acknowledged;
  }

  async editBill(id: ObjectId, body: BillEditDto, user: any): Promise<any> {
    const bill = await this.billCollection.findOne({ _id: id });
    if (!bill) throw new BadRequestException([{ field: 'Id', message: 'Bill is invalid' }]);

    const { numberElectricity, other, status } = body;
    const room = await this.roomCollection.findOne({ _id: new ObjectId(bill.roomId) });

    const { member, price, houseId } = room;
    if (houseId !== user['houseId']) throw new BadRequestException([{ field: 'HouseId', message: 'Dont Permission' }]);
    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    const { electricityPrice, waterPrice, wifiPrice } = house;
    const electricityBill = electricityPrice * numberElectricity;
    const waterBill = waterPrice * member;
    const wifiBill = wifiPrice;
    const otherBill = other ? other : 0;
    const total = electricityBill + waterBill + wifiBill + price + otherBill;
    const params = {
      electricityBill,
      total,
      updatedAt: new Date(),
      status,
      updateBy: user['username']
    };
    for (const prop in params) if (!params[prop]) delete params[prop];
    const [statusBill, updateBillRoom] = await Promise.all([
      this.billCollection.updateOne({ _id: id }, { $set: params }, { upsert: true }),
      this.roomCollection.updateOne(
        { _id: new ObjectId(bill.roomId) },
        { $set: { due: false, dueDate: new Date().getDate() } }
      )
    ]);

    return { bill: statusBill.modifiedCount, roomUpdate: updateBillRoom.modifiedCount };
  }
}
