import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { SearchModule } from './search/search.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }), 
    PlacesModule, 
    UserModule, SearchModule, ProfileModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
