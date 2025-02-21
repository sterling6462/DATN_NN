import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';
import { getPagination, sortData } from '../../pagination';
import { searchKeyword } from '../../search';
import { compareHash, hashValue } from '../../utils';
import { ManagerCreateDto, MemberCreateDto, UserEditDto, UserEditPasswordDto, UserSearchDto } from './dto';

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
    const { page: queryPage, size = 20, sortKey = '_id', sortOrder = 'desc', roomId, role, houseId, keyword } = query;
    const { skip, take } = getPagination(queryPage, size);
    const filter: any = {};

    if (roomId) filter.roomId = new ObjectId(roomId);
    if (houseId) filter.houseId = new ObjectId(houseId);
    if (role) filter.role = role

    if (keyword) filter.name = searchKeyword(keyword);
    const [data, total] = await Promise.all([
      this.userCollection.find(filter).sort(sortData(sortKey, sortOrder)).skip(skip).limit(take).collation({ locale: 'en_US', numericOrdering: true }).toArray(),
      this.userCollection.count(filter)
    ]);
    return { data, total };
  }

  async findUserById(id: ObjectId): Promise<any> {
    const user = await this.userCollection.findOne({ _id: id });
    if (!user) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    return user;
  }

  async createManager(data: ManagerCreateDto): Promise<any> {
    const { lastName, firstName, birthday, phone, houseId } = data;
    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    const countManager = await this.userCollection.findOne({ houseId: new ObjectId(houseId) });

    if (!house) throw new BadRequestException([{ field: 'houseId', message: 'House is invalid' }]);
    if (countManager) throw new BadRequestException([{ field: 'houseId', message: 'Manager is exist in house' }]);
    const locate = String(house.name).split(' ').map((a) => a[0]).join('').toLowerCase()
    const name = firstName.split(' ').map((a) => a[0]).join('') + lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const username = `${name.toLowerCase()}.manager@${locate}.nn.com`;

    const randomPass = Math.random().toString(36).slice(-8);
    const password = hashValue(randomPass, 10);
    const user = { lastName, firstName, username, password, birthday: new Date(birthday), role: 'manager', roles: ['member', 'manager'], location: house.location, phone, houseId: new ObjectId(houseId), createdAt: new Date() };
    const userId = (await this.userCollection.insertOne(user)).insertedId;
    const houseI = await this.houseCollection.updateOne({ _id: new ObjectId(houseId) }, { $set: { managerId: userId, managerCount: 1 } })
    return { userId, username, password: randomPass, houseUpdate:houseI.upsertedCount };
  }

  async createMember(data: MemberCreateDto, manager: any): Promise<any> {
    const { lastName, firstName, birthday, phone, roomId } = data;

    const room = await this.roomCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) throw new BadRequestException([{ field: 'roomId', message: 'Room is invalid' }]);
    const { member, maxMember, houseId } = room
    if (manager['houseId'] != houseId || manager["role"] == "admin") throw new BadRequestException([{ field: 'user', message: 'Unauthorized' }]);
    if (member == maxMember) throw new BadRequestException([{ field: 'roomId', message: 'Room is full slot' }]);

    const house = await this.houseCollection.findOne({ _id: new ObjectId(houseId) });
    const [locate, roomNumber] = room.name.toLowerCase().split('.')
    const name = firstName.split(' ').map((a) => a[0]).join('') + lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    const username = `${name.toLowerCase()}.${roomNumber}@${locate}.nn.com`;
    const checkMemberExist = await this.userCollection.findOne({ username: username });
    if (checkMemberExist) throw new BadRequestException([{ field: 'name', message: 'Member is exist in house' }]);
    const randomPass = Math.random().toString(36).slice(-8);
    const password = hashValue(randomPass, 10);
    const user = { lastName, firstName, username, password, birthday: new Date(birthday), role: 'member', roles: ['member'], location: house.location, phone, roomId: new ObjectId(roomId), status: true, houseId: new ObjectId(houseId), createdAt: new Date() };
    const updateRoom: any = {}
    updateRoom.member = member + 1
    if (member == 0) updateRoom.joinDate = new Date()
    const [userId, roomResult] = await Promise.all([this.userCollection.insertOne(user), this.roomCollection.updateOne({ _id: new ObjectId(roomId) }, { $set: updateRoom }, { upsert: true })])

    return { user: { userId: userId.insertedId, username, password: randomPass }, roomUpdate: roomResult.upsertedId };
  }

  async deleteUserById(id: ObjectId, manager: any): Promise<any> {
    const User = await this.userCollection.findOne({ _id: id });
    if (!User) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    const room = await this.roomCollection.findOne({ _id: new ObjectId(User.roomId) });
    const house = await this.houseCollection.findOne({ _id: new ObjectId(User.houseId) });

    if (manager['role'] == 'manager') {
      if (User.role == 'admin') throw new BadRequestException([{ field: 'role', message: 'User dont permission' }]);
      if (manager['houseId'] != room.houseId) throw new BadRequestException([{ field: 'role', message: 'User dont permission' }]);
    }
    if (User.role === 'manager') {
      if (manager['role'] !== 'admin') throw new BadRequestException([{ field: 'role', message: 'User dont permission' }]);

      const updateHouse: any = {}
      updateHouse.managerId = null
      if (house.managerCount == 1) updateHouse.managerCount = 0
      await this.houseCollection.updateOne({ _id: new ObjectId(User.houseId) }, { $set: updateHouse }, { upsert: true })
    }
    if (User.role === 'member') {
      const updateRoom: any = {}
      updateRoom.member = room.member - 1
      if (room.member == 1) { updateRoom.joinDate = null, updateRoom.status = false }
      await this.roomCollection.updateOne({ _id: new ObjectId(User.roomId) }, { $set: updateRoom }, { upsert: true })
    }
    return { status: (await this.userCollection.deleteOne({ _id: id })).acknowledged }
  }

  async editUser(id: ObjectId, body: UserEditDto): Promise<any> {
    const User = await this.userCollection.findOne({ _id: new ObjectId(id) });
    if (!User) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    const result = await this.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: body }, { upsert: true });
    return result.modifiedCount;
  }

  async editPassword(id: ObjectId, body: UserEditPasswordDto): Promise<any> {
    const { oldPassword, newPassword } = body
    const user = await this.userCollection.findOne({ _id: new ObjectId(id) });

    if (!user) throw new BadRequestException([{ field: 'Id', message: 'User is invalid' }]);
    if (!compareHash(oldPassword, user?.password)) throw new BadRequestException([{ field: 'oldPassword', message: 'Old Password is invalid' }]);
    const result = await this.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { password: hashValue(newPassword, 10) } }, { upsert: true });
    return result.modifiedCount;
  }
}
