import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';
import { RevenueDashBoardDto, UserDashBoardDto } from './dto';
import { ObjectId } from 'mongodb';


@Injectable()
export class DashboardService extends BaseLogger {
    private readonly houseCollection: Collection;
    private readonly billCollection: Collection;
    private readonly roomCollection: Collection;
    private readonly userCollection: Collection;

    constructor(@InjectConnection() private connection: Connection) {
        super(DashboardService.name);
        this.userCollection = this.connection.collection('users');
        this.houseCollection = this.connection.collection('house');
        this.billCollection = this.connection.collection('bills');
        this.roomCollection = this.connection.collection('rooms');
    }

    async dashboardForUser(query: UserDashBoardDto): Promise<any> {
        const { select } = query;

        const user = await this.userCollection.aggregate(
            [
                { $match: { role: 'member' } },
                {
                    $group:
                    {
                        _id: select == 'month' ?
                            {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            } : {
                                day: { $dayOfMonth: "$createdAt" },
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                        count: { $sum: 1 },
                        date: { $first: "$createdAt" }
                    }
                },
                {
                    $project:
                    {
                        date:
                        {
                            $dateToString: { format: select == 'month' ? "%Y-%m" : "%Y-%m-%d", date: "$date" }
                        },
                        count: 1,
                        _id: 0
                    }
                },
                { $sort: { date: 1 } }

            ]).toArray()
        return user
    }
    async dashboardForBill(query: any): Promise<any> {
        const { houseId } = query;

        const where: any = {}
        if (houseId) where.houseId = new ObjectId(houseId);

        const bill = await this.billCollection.aggregate(
            [
                // { $match: where },
                {
                    $group:
                    {
                        _id:
                        {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" },
                            due: { $eq: ["$status", true] },
                            noDue: { $eq: ["$status", false] }
                        },
                        count: { $sum: 1 },
                        date: { $first: "$createdAt" },
                        status: { $first: "$status" }
                    },
                },
                {
                    $project:
                    {
                        date:
                        {
                            $dateToString: { format: "%Y-%m", date: "$date" }
                        },
                        status: 1,
                        count: 1,
                        _id: 0
                    }
                },
                { $sort: { date: 1 } }
            ]).toArray()
        return bill
    }

    async dashboardForRoom(query: any): Promise<any> {
        const { houseId } = query;

        const where: any = {}
        if (houseId) where.houseId = new ObjectId(houseId);

        const room = await this.roomCollection.aggregate(
            [
                { $match: where },
                {
                    $group:
                    {
                        _id: {
                            a: { $eq: ["$member", 0] },
                            b: { $eq: ["$member", "$maxMember"] },
                            c: { $and: [{ $ne: ["$member", "$maxMember"] }, { $ne: ["$member", 0] }] }
                        },
                        count: { $sum: 1 },
                        status: { $first: "$member" }
                    }
                },
                {
                    $project:
                    {
                        status: 1,
                        count: 1,
                        _id: 0
                    }
                },
                { $sort: { status: 1 } }
            ]).toArray()
        return room
    }

    async dashboardForRevenue(query: RevenueDashBoardDto): Promise<any> {
        const { select, houseId } = query;

        const where: any = {}
        if (houseId) where.houseId = new ObjectId(houseId);

        const revenue = await this.billCollection.aggregate(
            [
                // { $match: where },
                {
                    $group:
                    {
                        _id: select == "year" ?
                            {
                                year: { $year: "$createdAt" },
                                due: { $eq: ["$status", true] },
                                noDue: { $eq: ["$status", false] }
                            } :
                            {
                                month: { $month: "$createdAt" },
                                year: { $year: "$createdAt" },
                                due: { $eq: ["$status", true] },
                                noDue: { $eq: ["$status", false] }
                            },
                        revenue: { $sum: "$total" },
                        date: { $first: "$createdAt" },
                        status: { $first: "$status" }
                    },
                },
                {
                    $project:
                    {
                        date:
                        {
                            $dateToString: { format: select == "year" ? "%Y" : "%Y-%m", date: "$date" }
                        },
                        revenue: 1,
                        status: 1,
                        _id: 0
                    }
                }
                ,
                { $sort: { date: 1 } }
            ]).toArray()
        return revenue
    }
}