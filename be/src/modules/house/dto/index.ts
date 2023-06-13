import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto';

export class HouseSearchDto extends PaginationDto {
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

export class HouseCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsNotEmpty()
  floorCount: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  electricityPrice: number;

  @IsNumber()
  @IsNotEmpty()
  waterPrice: number;

  @IsNumber()
  @IsNotEmpty()
  wifiPrice: number;
}

export class HouseUpdateDto {
  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsNumber()
  @IsNotEmpty()
  floorCount: number;

  @IsNumber()
  @IsNotEmpty()
  electricityPrice: number;

  @IsNumber()
  @IsNotEmpty()
  waterPrice: number;

  @IsNumber()
  @IsNotEmpty()
  wifiPrice: number;
}
