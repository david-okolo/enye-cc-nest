import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);

        return {
            success: true,
            message: 'User created' 
        }
    }
}
