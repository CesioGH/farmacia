import { IsDate, IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, isStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enums";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;


    @IsDateString()
    @IsOptional()
    birthAt: string

    @IsOptional()
    @IsEnum(Role)
    role: number
}