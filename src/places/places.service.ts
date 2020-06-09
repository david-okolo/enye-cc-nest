import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { LatLng, TextSearchResponse, Client } from '@googlemaps/google-maps-services-js';
import { MapService } from '../constants';

@Injectable()
export class PlacesService {

    constructor(
        @Inject(MapService) private mapService: Client
    ) {}


    getHospitals = async ({latlng, radius, query}: {
        latlng: LatLng,
        radius: number,
        query: string
    }) => {
    
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
    
            results.push(...data.results)
        } catch (error) {
            console.log(error)
            return new InternalServerErrorException("Google api request failed");
        }
    
        return results;
    }
}
