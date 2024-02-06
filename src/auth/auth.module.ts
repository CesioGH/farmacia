import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserModule } from "src/users/user.module";
import { FileModule } from "src/file/file.module";


@Module({
    imports: [
        forwardRef(()=>UserModule) ,
        PrismaModule,
        JwtModule.register({
            secret:process.env.JWT_SECRET
    }),
    FileModule,

],

    controllers: [AuthController],
    providers: [AuthService],
    exports:[AuthService]
})
export class AuthModule{

}