import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";

export class UserDashBoardDto {

    @IsMongoId()
    @IsOptional()
    houseId: string;
    
    @IsOptional()
    @IsEnum(["month"])
    select:string
}

export class RevenueDashBoardDto {
    @IsMongoId()
    @IsOptional()
    houseId: string;

    @IsOptional()
    @IsEnum(["year"])
    select:string
}