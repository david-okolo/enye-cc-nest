import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string) {

        let user;
        try {
            user = await this.userService.findOne(email);
        } catch (error) {
            console.log(error)
            return new InternalServerErrorException();
        }

        if (!user) {
            return null;
        }

        let isValid: boolean;
        try {
            isValid = await bcrypt.compare(pass, user.password);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }

        if (!isValid) {
            return null;
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }


    async login(user: any) {
        const payload = {
            name: user.name,
            email: user.email,
            sub: user.id
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
