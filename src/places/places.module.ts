import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { MapService } from '../constants';
import { Client } from '@googlemaps/google-maps-services-js';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [PlacesController],
  providers: [
    PlacesService,
    {
      provide: MapService,
      useValue: new Client({})
    }
  ]
})
export class PlacesModule {}
