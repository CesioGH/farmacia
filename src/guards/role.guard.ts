import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enums";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor( private readonly reflector: Reflector
    ) {}

   async canActivate(context: ExecutionContext){

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(),context.getClass()])
        
   console.log({requiredRoles})
   
    if (!requiredRoles){
        return true
    }

    
    const {user} = context.switchToHttp().getRequest()

    const rolesFiltered = requiredRoles.filter(role => role === user.role)

    return rolesFiltered.length > 0
        
    }

}