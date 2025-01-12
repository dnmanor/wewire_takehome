import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    login(loginDto: LoginDto){
        //do some checks and log user in. 
    }
}