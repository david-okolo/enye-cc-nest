import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async create({name, email, password}: CreateUserDto) {
        let user;
        try {
            user = await this.findOne(email);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        if (user) {
            throw new BadRequestException(`User already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await this.userModel.create({ name, email, password: hashedPassword})
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error saving user to db')
        }

        return true;
    }

    async findOne(email: string) {
        return await this.userModel.findOne({email: email});
    }
}
