import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto/index';
export class RoomSearchDto extends PaginationDto {
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

