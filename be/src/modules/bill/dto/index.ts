import { IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto';

export class BillSearchDto extends PaginationDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsMongoId()
  @IsNotEmpty()
  houseId: string;

  @IsOptional()
  @IsString()
  sortKey: string;

  @IsOptional()
  @IsIn([ORDER.ASC, ORDER.DESC])
  sortOrder: string;

  @IsOptional()
  @IsString()
  keyword: string;
}

export class BillCreateDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsNumber()
  @IsNotEmpty()
  numberElectricity: number;

  @IsNumber()
  @IsOptional()
  other: number;
}
export class BillEditDto {
  @IsNumber()
  @IsOptional()
  numberElectricity: number;

  @IsNumber()
  @IsOptional()
  other: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
