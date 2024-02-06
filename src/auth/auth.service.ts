import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/users/user.service";
import * as bcrypt from "bcrypt"


@Injectable()
export class AuthService {

        private  issuer= "login"
        private  audience= 'users'

        constructor(
            private readonly jwtService: JwtService,
             private readonly prisma: PrismaService,
             private readonly userService: UserService
        ) {}


            createToken(user:User){
              return {
                accsessToken: this.jwtService.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                 }, {
                   expiresIn: "20 days",
                   subject: String(user.id),
                   issuer: this.issuer,
                   audience: this.audience,
   
                 })
              }

           }
           
            checkToken(token: string) {
               
               try {
              const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer
               })

               return data
            } catch (e){
                throw new BadRequestException(e)
            }
           }

            isValidToken(token: string){

            try{
                this.checkToken(token)
                return true
            } catch (e) {
                return false
            }   
           
           }
            
           
        
           async login(email:string,password:string){

                const user = await this.prisma.user.findFirst({
                    where:{
                        email,
                    }
                })

                if (!user){
                    throw new UnauthorizedException("E-mail ou senha incorreta")
                }

                if(!(await bcrypt.compare(password,user.password))){
                    throw new UnauthorizedException("E-mail ou senha incorreta")
                }

                return this.createToken(user)

           }

           async forget(email: string){

            const user = await this.prisma.user.findFirst({
                where:{
                    email,
                }
            })

            if (!user){
                throw new UnauthorizedException("E-mail incorreto")
            }

                //TO DO: Enviar o e-mail...

            return true
           }




           async reset(password: string, token: string){

            //TO DO: validar o token...

            const id = 0

            const user = await this.prisma.user.update({
                where:{
                    id,
                },
                data: {
                    password,
                }
            })

            return this.createToken(user)

           }

           async register(data: AuthRegisterDTO){
              const user = await this.userService.create(data)
              return this.createToken(user)

           }

}