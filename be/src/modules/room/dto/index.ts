import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto/index';
import { Date, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
export class RoomSearchDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  num: number;

  @IsString()
  @IsOptional()
  sortKey: string;

  @IsString()
  @IsOptional()
  @IsEnum(ORDER)
  sortOrder: string;
}

export class RoomRequestDto {

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @IsString()
  @IsNotEmpty()
  houseId: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  amountRoom: number;

  // @IsNotEmpty()
  // @Transform( ({ value }) => new Date(value))
  // @IsDateString()
  // joinDate: Date;
}
