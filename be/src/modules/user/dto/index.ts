import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ORDER } from "../../../constants";
import { PaginationDto } from "../../../dto";
import { Date } from "mongoose";

export class UserSearchDto extends PaginationDto {
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

    @IsOptional()
    @IsString()
    keyword: string;
}

export class ManagerCreateDto {

    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsString()
    @IsNotEmpty()
    birthday:Date

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsMongoId()
    @IsOptional()
    houseId: string;
}

export class MemberCreateDto {

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    birthday: Date

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsMongoId()
    @IsOptional()
    roomId: string;
}

export class UserEditDto {

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    birthday: Date

    @IsNumber()
    @IsNotEmpty()
    phone: number;
}

export class UserEditPasswordDto {

    @IsString()
    @IsNotEmpty()
    oldPassword: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}