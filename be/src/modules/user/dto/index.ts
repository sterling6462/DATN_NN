import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ORDER } from "../../../constants";
import { PaginationDto } from "../../../dto";

export class UserSearchDto extends PaginationDto {
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

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsMongoId()
    @IsOptional()
    houseId: string;
  }
  