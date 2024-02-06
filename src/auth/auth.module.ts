import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserModule } from "src/users/user.module";


@Module({
    imports: [
        forwardRef(()=>UserModule) ,
        PrismaModule,
        JwtModule.register({
            secret:"JsuvBWZgQ0u1B9kIv7rP2IIUpSI0RO5c"
    }),
],

    controllers: [AuthController],
    providers: [AuthService],
    exports:[AuthService]
})
export class AuthModule{

}