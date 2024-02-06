import { BadRequestException, Body, Controller,  ParseFilePipe,  Post,   UploadedFile, UploadedFiles, UseGuards, UseInterceptors , FileTypeValidator, MaxFileSizeValidator} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { UserService } from "src/users/user.service";
import { AuthService } from "./auth.service";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
        ){}

    @Post('login')
    async login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body.email,body.password)
    }
    
    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

        return this.authService.register(body)

    }

    @Post('forget')
    async forget(@Body() body: AuthForgetDTO) {
        return this.authService.forget(body.email)
    }

    @Post('reset')
    async reset(@Body() body: AuthResetDTO) {
        return this.authService.reset(body.password, body.token)
    }


    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user){

            return {user}
    }
    
    @UseInterceptors(FileInterceptor('file')) // só um arquivo
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({ // esse pipe é pra filtrar os arquivos aceitos
        validators: [
             new FileTypeValidator({fileType:'image/png'}), // Aqui é o tipo de arquivo aceito
            new MaxFileSizeValidator({maxSize: 1024 * 100}), // esse 100 é o número de kb que o arquivo pode ter
        ]
    })) photo: Express.Multer.File){

        const path = join(__dirname,'..','..','storage','photos',`photo-${user.id}.png`)

        try{
         await this.fileService.upload(photo, path)
        } catch (e){
            throw new BadRequestException(e)
        }
        return {success:true}
    }

    @UseInterceptors(FilesInterceptor('files')) // varios arquivos
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]){
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }])) // varios arquivos
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}){
        return files
    }

    
}