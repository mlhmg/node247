import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class RegisterDTO{
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;
  
  @IsString()
  password: string;
}