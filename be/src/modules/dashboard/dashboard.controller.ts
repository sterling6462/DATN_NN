import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { MainValidationPipe } from '../../pipes';
import { DashboardService } from './dashboard.service';
import { RevenueDashBoardDto, UserDashBoardDto } from './dto';

@UsePipes(new MainValidationPipe())
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly _service: DashboardService) { }


    @Get('/user')
    dashboardForUser(@Query() query: UserDashBoardDto) {
      return this._service.dashboardForUser(query);
    }

    @Get('/bill')
    dashboardForBill(@Query() query: any) {
      return this._service.dashboardForBill(query);
    }

    @Get('/room')
    dashboardForRoom(@Query() query: any) {
      return this._service.dashboardForRoom(query);
    }

    @Get('/revenue')
    dashboardForRevenue(@Query() query: RevenueDashBoardDto) {
      return this._service.dashboardForRevenue(query);
    }
}
