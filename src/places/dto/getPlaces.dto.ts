import { LatLng } from '@googlemaps/google-maps-services-js';

export class GetPlacesDto {
    latlng: LatLng
    radius: number
    query: string
}