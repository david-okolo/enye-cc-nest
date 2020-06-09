import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { Client } from '@googlemaps/google-maps-services-js';

import { MapService } from './constants';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI')
    }),
    inject: [ConfigService]
  }), PlacesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: MapService,
      useValue: new Client({})
    }
  ],
})
export class AppModule {}
