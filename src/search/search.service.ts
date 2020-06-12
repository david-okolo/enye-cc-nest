import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Search } from './schemas/search.schema';
import { Model } from 'mongoose';
import { GetPlacesDto } from '../places/dto/getPlaces.dto';
import { Profile } from '../profile/schemas/profile.schema';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        @InjectModel(Search.name) private searchModel: Model<Search>
    ) {}

    async getPastSearches(user: any) {
        let searches: Search[];
        try {
            const profile = await this.profileModel.findById(user.userId).exec();
            searches = profile.pastSearches
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return searches;
    }

    async getOnlySearches() {
        let searches: Search[];

        try {
            searches = await this.searchModel.find().exec();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }

        return searches;
    }

    async create(user, body: GetPlacesDto) {
        const profile = await this.profileModel.findById(user.userId);
        const search = new this.searchModel({
            keyword: body.query,
            radius: body.radius,
            timestamp: Date.now()
        })
        profile.pastSearches.push(search);

        profile.save();
    }

    async createFree(body: GetPlacesDto) {
        await this.searchModel.create({
            keyword: body.query,
            radius: body.radius,
            timestamp: Date.now()
        }).catch(e => {
            console.log(e);
            throw new InternalServerErrorException();
        })
    }
}
