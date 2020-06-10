import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>
    ) {}

    async getProfileData(userId: string) {
        return await this.profileModel.findById(userId);
    }

    async createNewProfile(_id: string) {
        try {
            await this.profileModel.create({
                _id: _id,
                pastSearches: []
            })
        } catch (error) {
            throw new InternalServerErrorException();
            console.log(error)
        }
    }
}
