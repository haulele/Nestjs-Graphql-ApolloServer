import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import  * as bcrypt from 'bcrypt';
import { RegisterUserInput } from './dto/register-user';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LocalFileService } from 'src/files/file.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private localFile: LocalFileService,
        private mailService: MailService,
      ) {}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new UnauthorizedException();
          }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (user && isPasswordMatch) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User){
        return {
            access_token: this.jwtService.sign({
                user_name: user.username,
                user_id: user._id,
            }),
            user,
        }
    }

    async signup(registerUserInput: RegisterUserInput){
        const user = await this.usersService.findOne(registerUserInput.username);
        if(user){
            throw new Error('User already exists!');
        }   

        const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.mailService.sendUserConfirmation(registerUserInput.username, confirmationCode);
        const password = await bcrypt.hash(registerUserInput.password, 10);    
        const {filename} = await registerUserInput.image;
        const image = await this.localFile.uploadFile(await registerUserInput.image, filename );
        
        return this.usersService.createUser({
            ...registerUserInput,
            password,
            image,
            created_At: registerUserInput.created_at,
        });
  }
}
