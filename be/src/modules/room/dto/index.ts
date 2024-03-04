import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto/index';
export class RoomSearchDto extends PaginationDto {
  @IsMongoId()
  @IsOptional()
  houseId: string;

  @IsOptional()
  @IsString()
  type: string;

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


export class RoomDropdownDto extends PaginationDto {
  @IsMongoId()
  @IsOptional()
  houseId: string;
}

export class RoomCreateDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @IsMongoId()
  @IsOptional()
  houseId: string;

  @IsNumber()
  @IsNotEmpty()
  amountRoom: number;

  // @IsNotEmpty()
  // @Transform( ({ value }) => new Date(value))
  // @IsDateString()
  // joinDate: Date;
}

export class RoomEditDto {
  @IsString()
  @IsNotEmpty()
  type:string;
}

