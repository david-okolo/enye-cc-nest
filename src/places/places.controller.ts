import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GetPlacesDto } from './dto/getPlaces.dto';
import { PlacesService } from './places.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('places')
export class PlacesController {
    constructor(
        private placesService: PlacesService
    ) {}

    @UseGuards(JwtGuard)
    @Post()
    async getPlaces(@Req() req, @Body() getPlacesDto: GetPlacesDto) {
        const data = await this.placesService.getHospitals(getPlacesDto, req.user);
        return {
            data
        }
    }

    @Post('free')
    async getPlacesUnrestricted(@Body() getPlacesDto: GetPlacesDto) {
        const data = await this.placesService.getHospitals(getPlacesDto);
        return {
            data
        }
    }
}
