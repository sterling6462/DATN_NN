import { IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ORDER } from '../../../constants';
import { PaginationDto } from '../../../dto';

export class BillSearchDto extends PaginationDto {
  @IsOptional()
  @IsMongoId()
  roomId: string;

  @IsOptional()
  @IsMongoId()
  houseId: string;

  @IsOptional()
  @IsString()
  sortKey: string;

  @IsOptional()
  @IsIn([ORDER.ASC, ORDER.DESC])
  sortOrder: string;
}

export class BillCreateDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsNumber()
  @IsNotEmpty()
  currentElectricity: number;

  @IsNumber()
  @IsOptional()
  other: number;
}
export class BillEditDto {
  @IsNumber()
  @IsNotEmpty()
  currentElectricity: number;

  @IsNumber()
  @IsOptional()
  other: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
