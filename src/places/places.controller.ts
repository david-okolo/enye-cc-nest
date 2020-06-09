import { Controller, Post, Body } from '@nestjs/common';
import { GetPlacesDto } from './dto/getPlaces.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(
        private placesService: PlacesService
    ) {}

    @Post()
    async getPlaces(@Body() getPlacesDto: GetPlacesDto) {

        const data = await this.placesService.getHospitals(getPlacesDto);
        return {
            data
        }
    }
}
