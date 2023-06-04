import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { BillService } from './bill.service';
import { MainValidationPipe, ParseObjectIdPipe } from '../../pipes';
import { BillCreateDto, BillEditDto, BillSearchDto } from './dto';

@Controller('bill')
export class BillController {
  constructor(private readonly _service: BillService) {}
  // @HttpCode(HttpStatus.OK)
  @Get('')
  getAllBill(@Query() query: BillSearchDto) {
    return this._service.getAllBill(query);
  }

  @Get(':id')
  findBillById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.findBillById(id);
  }

  @Post('/create')
  createBill(@Body() body: BillCreateDto, @Req() req: Request) {
    return this._service.createBill(body, req['user']);
  }

  @Delete('/:id')
  deleteBillById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this._service.deleteBillById(id);
  }

  @Patch(':id')
  @UsePipes(new MainValidationPipe())
  editBill(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() body: BillEditDto, @Req() req: Request) {
    return this._service.editBill(id, body, req['user']);
  }
}
