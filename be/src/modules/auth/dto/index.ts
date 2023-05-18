import { IsNotEmpty,  IsOptional,  MaxLength } from 'class-validator';

export class ClientRequestDto {
  @MaxLength(255)
  @IsOptional()
  name: string;

  @MaxLength(255)
  @IsOptional()
  location: string;

  @IsOptional()
  phone: number;

  @MaxLength(100)
  @IsNotEmpty()
  username: string;

  @MaxLength(250)
  @IsNotEmpty()
  password: string;
}

export class LoginRequestDto {
    @MaxLength(100)
    @IsNotEmpty()
    username: string;
  
    @MaxLength(250)
    @IsNotEmpty()
    password: string;
}
