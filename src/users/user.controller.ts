import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Role } from "src/enums/role.enums";
import { Roles } from "src/decorators/role.decorator";
import {RoleGuard} from "../guards/role.guard"
import { AuthGuard } from "src/guards/auth.guard";
import { Throttle } from "@nestjs/throttler";

@Roles(Role.Admin)
@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard,RoleGuard)
@Controller("users")

export class UserController {

    constructor(private readonly userService: UserService){}

    // @SkipThrottle() //use esse decorator para o Throttler não funcionar nessa rota
   // @Throttle({ default: { limit: 20, ttl: 60000 } }) // use esse decorator para customizar o limit e o ttl para essa rota, tanto para aumentar ou diminuir os valores. Ou seja, ele override o global
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data)
    }

    @Get()
    async list(){
        return this.userService.list()
    }

    
    @Get(':id')
    async show(@ParamId() id:number ){
        console.log({id})
        return this.userService.show(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number){
        return this.userService.update(id, data)

    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number){
        return this.userService.updatePartial(id,data)

    }

    @Delete(":id")
    async delete(@ParamId() id: number){
        return this.userService.delete(id)
    }

}