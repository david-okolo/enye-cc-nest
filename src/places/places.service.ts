import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { TextSearchResponse, Client } from '@googlemaps/google-maps-services-js';
import { MapService } from '../constants';
import { SearchService } from '../search/search.service';
import { GetPlacesDto } from './dto/getPlaces.dto';

@Injectable()
export class PlacesService {

    constructor(
        @Inject(MapService) private mapService: Client,
        private searchService: SearchService
    ) {}


    getHospitals = async (user, body: GetPlacesDto) => {

        const { 
            query,
            radius,
            latlng
        } = body;
    
        const results = [];
    
        try {
            const { data }: TextSearchResponse = await this.mapService.textSearch({
                params: {
                    key: process.env.GOOGLE_API_KEY,
                    query: query,
                    location: latlng,
                    radius: radius
                }
            })

            await this.searchService.create(user, body)
    
            results.push(...data.results)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException("Google api request failed");
        }
    
        return results;
    }
}
