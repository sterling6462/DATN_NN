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
import { Date } from 'mongoose';
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
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  maxMember: number;

  @IsNumber()
  @IsNotEmpty()
  member: number;

  @IsNumber()
  @IsNotEmpty()
  dueDate: number;

  // @IsNotEmpty()
  // @Transform( ({ value }) => new Date(value))
  // @IsDateString()
  // joinDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsBoolean()
  @IsNotEmpty()
  due: boolean;
}
