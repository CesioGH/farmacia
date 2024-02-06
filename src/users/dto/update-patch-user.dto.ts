import { IsEmail, IsString, IsStrongPassword, isStrongPassword } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import {PartialType} from "@nestjs/mapped-types"

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {



}